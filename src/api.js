const axios = require('axios');
const qs = require('querystring');
const apiUrl = 'https://slack.com/api';
const githubUrl = 'https://api.github.com'



const callAPIMethodPost = async (method, payload) => {
    let result = await axios.post(`${apiUrl}/${method}`, payload, {
      headers: { Authorization: "Bearer " + process.env.SLACK_ACCESS_TOKEN }
    });
    return result.data;
  }

const callgitAPIMethodPost = async () => {
    console.log('calling github api')
    let result = await axios.post(`${githubUrl}/repos/softwareartistry/k8s-cli/actions/workflows/penknife-ui-deploy.yml/dispatches`, {"ref":"sprint"}, {
      headers: { Authorization: "Bearer " + process.env.GITHUB_ACCESS_TOKEN }
    });
    console.log('github call api sucessfull');
  }
  

module.exports = {
    callAPIMethodPost,
    callgitAPIMethodPost
}