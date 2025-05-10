import axios from 'axios';

const apiRequest = async (method, url, body = {}, headers = {}) => {
  try {
    const response = await axios({
      method: method,       
      url: url,
      data: body,
      headers: {
        // 'Content-Type': 'application/json',
        ...headers,
      },
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status,
      error: null
    };

  } catch (error) {
    return {
      success: false,
      data: null,
      status: error.response ? error.response.status : 500,
      error: error.response ? error.response.data : error.message
    };
  }
};

export default apiRequest;
