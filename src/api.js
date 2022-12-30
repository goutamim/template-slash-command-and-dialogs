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

const callgitAPIMethodPost = async (data) => {
    console.log('inside githubapi call');
    console.log(data)
    appName= data.reponame.split(' ')[0]
    tenantName= data.reponame.split(' ')[1]
    console.log(appName + "space" + tenantName)
    console.log(`${githubUrl}/repos/softwareartistry/k8s-cli/actions/workflows/${appName}.yml/dispatches`, {"ref":"sprint","inputs":{"tenant":`"${tenantName}"`}}, {
        headers: { Authorization: "Bearer " + process.env.GITHUB_ACCESS_TOKEN }
      })
    //let result = await axios.post(`${githubUrl}/repos/softwareartistry/k8s-cli/actions/workflows/penknife-ui-deploy.yml/dispatches`, {"ref":"sprint"}, {
    let result = await axios.post(`${githubUrl}/repos/softwareartistry/k8s-cli/actions/workflows/${appName}.yml/dispatches`, {"ref":"sprint","inputs":{"tenant":`"${tenantName}"`}}, {
      headers: { Authorization: "Bearer " + process.env.GITHUB_ACCESS_TOKEN }
    });
    console.log(result)
    console.log('github call api sucessfull');
  }
  
  const postApproval = async (payload, data) => {
    console.log(data);
    repo=data.reponame;
    console.log(repo.split(' ')[0]);
    await callAPIMethodPost('chat.update', {
      channel: payload.channel.id,
      ts: payload.message.ts,
      text: `Deployment triggered for ${data.reponame}:white_check_mark: Approved by <@${payload.user.id}> :memo: Requested by <@${data.requester}>`,
      blocks: null
    });

    let res = await callAPIMethodPost('conversations.open', {
        users: data.requester
      })

      console.log(res)
     
      await callAPIMethodPost('chat.postMessage',  {
        channel: res.channel.id,
        text: `Deployment triggered for ${data.reponame}  :white_check_mark: Approved by <@${payload.user.id}> :memo: Requested by <@${data.requester}>`,
        blocks: null
      });

}

    const rejectApproval = async (payload, data) => {
        await callAPIMethodPost('chat.update', {
          channel: payload.channel.id,
          ts: payload.message.ts,
          text: `Deployment requested for ${data.reponame}  :x: Rejected by <@${payload.user.id}> :memo: Requested by <@${data.requester}>`,
          blocks: null
        });
        let res = await callAPIMethodPost('conversations.open', {
            users: data.requester
          })
    
          console.log(res)

        await callAPIMethodPost('chat.postMessage',  {
            channel: res.channel.id,
            text: `Deployment requested for ${data.reponame}  :x: Rejected by <@${payload.user.id}> :memo: Requested by <@${data.requester}>`,
            blocks: null
          });
        }

    const norepoTenant = async (data) => {
        console.log("no repo or Tenant message ");

        let res = await callAPIMethodPost('conversations.open', {
            users: data.requester
            })

        console.log(res)
            
        await callAPIMethodPost('chat.postMessage',  {
            channel: res.channel.id,
            text: `Deployment request not sent for approval as  ${data.reponame} does not exist`,
            blocks: null
        });

}


module.exports = {
    callAPIMethodPost,
    callgitAPIMethodPost,
    postApproval,
    rejectApproval,
    norepoTenant
}