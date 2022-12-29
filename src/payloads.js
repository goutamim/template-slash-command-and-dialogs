module.exports = {
    approvalRequest: context => {
        return {
            channel: context.channel,
            text: `Deployment of ${context.reponame} requested by <@${context.requester}>`,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Deployment of ${context.reponame} requested by <@${context.requester}>`
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
    },
    messageNoRepo: context => {
        return {
            channel: context.channel,
            text: `Deployment of ${context.reponame} requested by <@${context.requester}>`,
            blocks: [
                {
                    "response_type": "empheral",
                    "text": "repo  or tenant dont exist"
                }
            ]
        }
    }
}