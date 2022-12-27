module.exports = {
    approve: context => {
        return {
            channel: context.channel,
            text: `Deployment of ${context.reponame} requested by <@${context.requester}>`,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `<@${context.requester}> is requesting a deployment.`
                    }
                },
                {
                    type: 'actions',
                    elements: [
                        {
                            action_id: 'approve',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Approve',
                                emoji: true
                            },
                            style: 'primary',
                            value: JSON.stringify(context)
                        },
                        {
                            action_id: 'reject',
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Reject',
                                emoji: true
                            },
                            style: 'danger',
                            value: JSON.stringify(context)
                        }
                    ]
                }
            ]
        }
    }
}