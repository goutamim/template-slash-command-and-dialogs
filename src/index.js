require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const signature = require('./verifySignature');
const api = require('./api');
const payloads = require('./payloads');
const debug = require('debug')('slash-command-template:index');

const app = express();

const repoList =['penknife-ui','test','dummy-repo']

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.get('/', (req, res) => {
  res.send('<h2>The Slash Command and Dialog app is running</h2> <p>Follow the' +
    ' instructions in the README to configure the Slack App and your environment variables.</p>');
});

/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post('/deploy', async (req, res) => {
  // Verify the signing secret
  if (!signature.isVerified(req)) {
    debug('Verification token mismatch');
    return res.status(404).send();
  }

  // extract the slash command text, and trigger ID from payload
  const { text,user_id } = req.body;
  console.log(req.body)

  if(repoList.includes(text)){
    //post in production channel
    let data = {requester:user_id,reponame:text,channel:'C049H541U15'}
    await  api.callAPIMethod('chat.postMessage', payloads.approve(data));
  }
  else{
              // repo doesnt exist or auto deployment not setup
      }

  // create the modal payload - includes the dialog structure, Slack API token,
  // and trigger ID
  // let view = payloads.modal({
  //   trigger_id
  // });

  // let result = await api.callAPIMethod('views.open', view);

  return res.send('');
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
app.post('/interactive', (req, res) => {
  // Verify the signing secret
  if (!signature.isVerified(req)) {
    debug('Verification token mismatch');
    return res.status(404).send();
  }

  const body = JSON.parse(req.body.payload);
  console.log(body);
  res.send('');
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
