
import axios from 'axios';

async function testLogin() {
  try {
    const response = await axios.post('https://ai-resume-analyzer-id8q.onrender.com/api/auth/login', {
      email: 'sofinmansuri0@gmail.com',
      password: 'some_password' // I don't know the password
    });
    console.log('Response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
  }
}

testLogin();
