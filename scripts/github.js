module.exports = (robot) => {
  robot.commands.push('hubot add repository <name> - Create a new reporitory in our GitHub organization.');
  robot.respond(/add repository (.*)/i, (res) => {
    repository = res.match[1];
    const auth = `Basic ${Buffer.from(process.env.CIRCLECI_TOKEN).toString('base64')}:`
    const data = { build_parameters: { CIRCLE_JOB: "add-repository", REPOSITORY_TO_ADD: repository }}

    res.reply(`Triggering creation of repository ${repository}. Hold on, I'll keep you posted...`);
    robot
      .http('https://circleci.com/api/v1.1/project/github/plossys/terraform/tree/master')
      .headers({Authorization: auth, 'Content-Type': 'application/json'})
      .post(JSON.stringify(data))((err, response, body) => {
        if (err) {
          res.reply(`Sorry, but the following error occured: ${err.message}`);
        } else {
          res.reply(`Creation of repository ${repository} triggered. You'll get a request for approval in a miunte. Watch #terraform-test for the notification.`);
        }
      });
  });

  robot.commands.push('hubot delete repository <name> - Delete reporitory from our GitHub organization.');
  robot.respond(/delete repository (.*)/i, (res) => {
    repository = res.match[1];
    const auth = `Basic ${Buffer.from(process.env.CIRCLECI_TOKEN).toString('base64')}:`
    const data = { build_parameters: { CIRCLE_JOB: "delete-repository", REPOSITORY_TO_DELETE: repository }}

    res.reply(`Triggering removal of repository ${repository}. Hold on, I'll keep you posted...`);
    robot
      .http('https://circleci.com/api/v1.1/project/github/plossys/terraform/tree/master')
      .headers({Authorization: auth, 'Content-Type': 'application/json'})
      .post(JSON.stringify(data))((err, response, body) => {
        if (err) {
          res.reply(`Sorry, but the following error occured: ${err.message}`);
        } else {
          res.reply(`Removal of repository ${repository} triggered. You'll get a request for approval in a miunte. Watch #terraform-test for the notification.`);
        }
      });
  });
};
