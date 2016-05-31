package com.innovation.net;

import android.util.Log;

import com.innovation.value.ResCode;
import com.innovation.value.ValueUtil;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.Proxy;
import java.net.SocketException;
import java.net.SocketTimeoutException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by Howell on 16/5/12.
 */
public class NetHttpClient {
    private static final int JSON = 0;
    private static final int XML = 1;
    private static final int NONE = 99;
    /**
     * 连接超时设置 50秒
     */
    private static final int connectTimeout = 50 * 1000;

    /**
     * 读取超时设置 60秒 为了避免客户端读取超时重发，设置的读取超时时间应该比连接的超时时间稍微长一点
     */
    private static final int readTimeout = 60 * 1000;

    /**
     * 默认字符编码
     */
    private static final String DEFAULT_CHARSET_NAME = "UTF-8";

    public String invokeCPSServiceViaJson(String url, Proxy proxy, String request, int type, String method) {
        String response = null;
        if (url.indexOf("https://") >= 0 || url.indexOf("HTTPS://") >= 0) {
            response = invokeServiceViaHttps(url, proxy, request, type, method);// 换成httpsClient的方法
        } else {
            response = invokeServiceViaHttp(url, proxy, request, type, method);// 换成httpClient的方法
        }
        return response;
    }

    private static String invokeServiceViaHttp(String url, Proxy proxy, String request, int type, String method) {
        Log.i("invokeServiceViaHttp","url:\n" + url);
        Log.i("invokeServiceViaHttp","request:\n" + request);
        HttpURLConnection httpConn = null;
        OutputStream out = null;
        InputStream in = null;
        DataOutputStream dos = null;
        String response = "";

        try {
            if (proxy != null) {
                httpConn = (HttpURLConnection) new URL(url).openConnection(proxy);
            } else {
                httpConn = (HttpURLConnection) new URL(url).openConnection();
            }
            byte[] content = request.getBytes(DEFAULT_CHARSET_NAME);
            httpConn.setConnectTimeout(connectTimeout);
            httpConn.setReadTimeout(readTimeout);
            if(method != null){
                httpConn.setRequestMethod("POST");// 设定请求的方法为"POST"，默认是GET
            } else {
                httpConn.setRequestMethod(method);
            }

            if (type == JSON) {
                httpConn.setRequestProperty("Content-Type",
                        "application/json;charset=utf-8");
            } else if (type == XML) {
                httpConn.setRequestProperty("Accept", "*/*");
                httpConn.setRequestProperty("Accept-Encoding",
                        "gzip,deflate,sdch");
                httpConn.setRequestProperty("Accept-Language", "zh-CN,zh;q=0.8");
                httpConn.setRequestProperty("Content-Type",
                        "text/xml;charset=utf-8");
            }
            httpConn.setUseCaches(false);
            httpConn.setDoInput(true);
            httpConn.setDoOutput(true);
            httpConn.connect();

            out = httpConn.getOutputStream();
            dos = new DataOutputStream(out);
            dos.write(content);
            dos.close();
			/*
			 * out.write(content); out.flush();
			 */
            out.close();// 先关闭？ hpg 14.11.20
            if (httpConn.getResponseCode() != 200) {
                throw new SocketTimeoutException("访问服务器超时");
            }

            in = httpConn.getInputStream();
            String charsetName = httpConn.getContentEncoding();
            if (ValueUtil.isEmpty(charsetName)) {
                charsetName = getEncodeCharsetName(httpConn.getContentType());
            }
            response = readResponse(in, charsetName);
            // 从SOAP消息体中取出数据
//            if (type == XML && !response.isEmpty()) {
//                response = XmlResponseUtils.getNodeText(response, INF_SOAP_RESPONSE_TAG);
//            }
            in.close();// 先关闭? hpg 14.11.20
        } catch (MalformedURLException e) {
            response = buildErrorResult(ResCode.REQUEST_URL_ERROR,
                    ResCode.REQUEST_URL_ERROR_MSG, e, type);
            Log.i("invokeServiceViaHttp","请求服务器地址无效" + e);
        } catch (SocketTimeoutException e) {// 访问服务器超时
            response = buildErrorResult(ResCode.CALL_SERVICE_TIMEOUT,
                    ResCode.CALL_SERVICE_TIMEOUT_MSG, e, type);
            Log.i("invokeServiceViaHttp","访问服务器超时" + e);
        } catch (SocketException e) {
            response = buildErrorResult(ResCode.CREATE_REQUEST_ERROR,
                    ResCode.CREATE_REQUEST_ERROR_MSG, e, type);
            Log.i("invokeServiceViaHttp","请求服务器失败" + e);
        } catch (IOException e) {// 读取服务器数据出错
            response = buildErrorResult(ResCode.READ_SERVICE_DATA_ERROR,
                    ResCode.READ_SERVICE_DATA_ERROR_MSG, e, type);
            Log.i("invokeServiceViaHttp","读取服务器数据出错" + e);
        } catch (Exception e) {// 访问服务器发生未知错误
            response = buildErrorResult(ResCode.RESUEST_UNKNOWN_ERROR,
                    ResCode.RESUEST_UNKNOWN_ERROR_MSG, e, type);
            Log.i("invokeServiceViaHttp","访问服务器发生未知错误" + e);
        } finally {
            // 关闭流操作
            close(in);
            close(out);
            if (httpConn != null) {
                httpConn.disconnect();
            }
            // 检查响应数据是否为空
            if (response.isEmpty()) {
                response = buildErrorResult(ResCode.GET_SERVICE_RESPONSE_ERROR,
                        ResCode.GET_SERVICE_RESPONSE_ERROR_MSG, null, type);
            }
        }
        Log.i("invokeServiceViaHttp"," response:\n" + response);
        return response;
    }

    /**
     * 生产环境运用，使用Https服务
     *
     * @param url
     * @param proxy
     * @param request
     * @param type
     *
     * @return
     */
    private static String invokeServiceViaHttps(String url, Proxy proxy, String request, int type, String method) {
        HttpsURLConnection httpsConn = null;
        OutputStream out = null;
        InputStream in = null;
        String response = "";
        try {
            if (proxy != null) {
                httpsConn = (HttpsURLConnection) new URL(url).openConnection(proxy);
            } else {
                httpsConn = (HttpsURLConnection) new URL(url).openConnection();
            }

            byte[] content = request.getBytes(DEFAULT_CHARSET_NAME);

            httpsConn.setConnectTimeout(connectTimeout);
            httpsConn.setReadTimeout(readTimeout);
            if(method != null){
                httpsConn.setRequestMethod("POST");// 设定请求的方法为"POST"，默认是GET
            } else {
                httpsConn.setRequestMethod(method);
            }


            if (type == JSON) {
                httpsConn.setRequestProperty("Content-Type",
                        "application/json;charset=utf-8");// 设定传送的内容类型是json
            } else if (type == XML) {
                httpsConn.setRequestProperty("Content-Type",
                        "text/xml;charset=utf-8");// 设定传送的内容类型是xml
            }

            httpsConn.setUseCaches(false);// Post 请求不能使用缓存
            httpsConn.setDoInput(true);// 设置是否从httpUrlConnection读入，默认情况下是true;
            httpsConn.setDoOutput(true);// 设置是否向httpUrlConnection输出，因为这个是post请求，参数要放在
            // http正文内，因此需要设为true, 默认情况下是false;
            httpsConn.connect();// 连接

            out = httpsConn.getOutputStream();// 此处getOutputStream会隐含的进行connect(即：如同调用上面的connect()方法，
            // 所以在开发中不调用上述的connect()也可以)。
            DataOutputStream dos = new DataOutputStream(out);
            dos.write(content);
            dos.close();
            out.close();

            in = httpsConn.getInputStream();
            String charsetName = httpsConn.getContentEncoding();
            if (ValueUtil.isEmpty(charsetName)) {
                charsetName = getEncodeCharsetName(httpsConn.getContentType());
            }
            response = readResponse(in, charsetName);
//            从SOAP消息体中取出数据
//            if (type == XML && !response.isEmpty()) {
//                response = XmlResponseUtils.getNodeText(response,
//                        INF_SOAP_RESPONSE_TAG);
//            }
            in.close();// 先关闭？ hpg 14.11.20
        } catch (MalformedURLException e) {
            response = buildErrorResult(ResCode.REQUEST_URL_ERROR,
                    ResCode.REQUEST_URL_ERROR_MSG, e, type);
            Log.i("invokeServiceViaHttp","请求服务器地址无效" + e);
        } catch (SocketTimeoutException e) {// 访问服务器超时
            response = buildErrorResult(ResCode.CALL_SERVICE_TIMEOUT,
                    ResCode.CALL_SERVICE_TIMEOUT_MSG, e, type);
            Log.i("invokeServiceViaHttp","访问服务器超时" + e);
        } catch (SocketException e) {
            response = buildErrorResult(ResCode.CREATE_REQUEST_ERROR,
                    ResCode.CREATE_REQUEST_ERROR_MSG, e, type);
            Log.i("invokeServiceViaHttp","请求服务器失败" + e);
        } catch (IOException e) {// 读取服务器数据出错
            if (ValueUtil.isNotEmpty(e.getMessage())
                    && e.getMessage().contains("validation time")) {
                response = buildErrorResult(ResCode.READ_SERVICE_DATA_ERROR,
                        ResCode.READ_SERVICE_DATA_ERROR_TIME_MSG, e, type);
            } else {
                response = buildErrorResult(ResCode.READ_SERVICE_DATA_ERROR,
                        ResCode.READ_SERVICE_DATA_ERROR_MSG, e, type);
            }
            Log.i("invokeServiceViaHttp","读取服务器数据出错" + e);
        } catch (Exception e) {// 访问服务器发生未知错误
            response = buildErrorResult(ResCode.RESUEST_UNKNOWN_ERROR,
                    ResCode.RESUEST_UNKNOWN_ERROR_MSG, e, type);
            Log.i("invokeServiceViaHttp","访问服务器发生未知错误" + e);
        } finally {
            // 关闭流操作
            close(in);
            close(out);
            if (httpsConn != null) {
                httpsConn.disconnect();
            }
            // 检查响应数据是否为空
            if (response.isEmpty()) {
                response = buildErrorResult(ResCode.GET_SERVICE_RESPONSE_ERROR,
                        ResCode.GET_SERVICE_RESPONSE_ERROR_MSG, null, type);
            }
        }
        return response;
    }

    /**
     * 获取编码
     *
     * @param contentType
     * @return
     */
    private static String getEncodeCharsetName(String contentType) {
        String charsetName = DEFAULT_CHARSET_NAME;
        if (!contentType.isEmpty()) {
            if (contentType.indexOf("charset=") != -1) {
                String[] fields = contentType.trim().split(";");
                for (int i = 0; i < fields.length; i++) {
                    String field = fields[i];
                    int index = field.indexOf("=");
                    if (index != -1) {
                        String key = field.substring(0, index);
                        if ("charset".equals(key)) {
                            charsetName = field.substring(index + 1);
                            break;
                        }
                    }
                }
            }
        }
        return charsetName;
    }
    /**
     *
     * @param codeNetworkError
     * @param message
     * @param e
     * @param type
     * @return
     */
    private static String buildErrorResult(String codeNetworkError,
                                           String message, Exception e, int type) {
        if (type == JSON) {
            return buildJsonErrorResult(codeNetworkError, message, e);
        } else {
            return buildXmlErrorResult(codeNetworkError, message, e);
        }
    }

    /**
     *
     * @param codeNetworkError
     * @param message
     * @param e
     * @return
     */
    private static String buildJsonErrorResult(String codeNetworkError,
                                               String message, Exception e) {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"retCode\":\"").append(codeNetworkError)
                .append("\",\"retMsg\":\"").append(message)
                .append("\",\"code\":\"").append(codeNetworkError)
                .append("\",\"content\":\"").append(message).append("\"}");
        return sb.toString();
    }

    /**
     *
     * @param errorCode
     * @param message
     * @param e
     * @return
     */
    private static String buildXmlErrorResult(String errorCode, String message,
                                              Exception e) {
        StringBuilder sb = new StringBuilder(
                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        sb.append("<Response>").append("<PayPlatResponseParameter>")
                .append("<RESPONSECODE>").append(errorCode)
                .append("</RESPONSECODE>").append("<RESPONSECONTENT>")
                .append(message).append("</RESPONSECONTENT>")
                .append("<EXCEPTION>").append(e.getClass().getName())
                .append("</EXCEPTION>").append("</PayPlatResponseParameter>")
                .append("</Response>");
        return sb.toString();
    }


    /**
     *
     * @param input
     * @param encode
     * @return
     * @throws IOException
     */
    private static String readResponse(InputStream input, String encode)
            throws IOException {
        StringBuilder result = new StringBuilder("");
        BufferedReader reader = null;
        try {
            if (encode.isEmpty()) {
                // 按指定的编码读入流
                reader = new BufferedReader(
                        new InputStreamReader(input, encode), 1024);
            } else {
                // 按默认的编码读入
                reader = new BufferedReader(new InputStreamReader(input,"UTF-8"), 1024);
            }

            for (String line = reader.readLine(); line != null; line = reader
                    .readLine()) {
                result.append(line);
            }
        } finally {
            if (reader != null) {
                reader.close();
            }
            if (input != null) {
                input.close();
            }

        }
        return result.toString();
    }

    /**
     *
     * @Method_name: close
     * @Description:用于关闭一些流操作
     * @param closeable
     * @return type: void
     * @throws
     * @author GuoYuehui
     */
    public static void close(Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            closeable = null;
        }
    }


    /**
     *
     * @param in0
     * @param in1
     * @return
     */
    private static String buildInfXmlMessage(String in0, String in1) {
        StringBuilder soapMsg = new StringBuilder();
        soapMsg.append(
                "<soapenv:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:impl=\"http://impl.websvc\">")
                .append("<soapenv:Header/><soapenv:Body><impl:dispatchCommandEXT soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">")
                .append("<in0 xsi:type=\"soapenc:string\" xs:type=\"type:string\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\">")
                .append(in0)
                .append("</in0><in1 xsi:type=\"soapenc:string\" xs:type=\"type:string\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\"><![CDATA[")
                .append(in1)
                .append("]]></in1></impl:dispatchCommandEXT><in0 xs:type=\"type:string\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\"/><in1 xs:type=\"type:string\" xmlns:xs=\"http://www.w3.org/2000/XMLSchema-instance\"/></soapenv:Body></soapenv:Envelope>");
        return soapMsg.toString();
    }


    /**
     *
     * @param in0
     * @param in1
     * @return
     */
    private static String buildInfJsonMessage(String in0, String in1) {
        StringBuilder jsonMsg = new StringBuilder();
        jsonMsg.append("JSONREQUEST").append("=")
                .append("{\"JSONREQUEST\":[{\"in0\":\"").append(in0)
                .append("\"},{\"in1\":").append(in1).append("}]}");
        return jsonMsg.toString();
    }

}
