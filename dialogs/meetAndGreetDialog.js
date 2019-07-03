// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ComponentDialog, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');

const TEXT_PROMPT = 'TextPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';

class MeetAndGreetDialog extends ComponentDialog {
    constructor(id) {
        super(id || 'meetAndGreetDialog');
        this.addDialog(new TextPrompt(TEXT_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.personNameStep.bind(this),
            this.finalStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * If a personName has not been provided, prompt for one.
     */
    async personNameStep(stepContext) {
        const bookingDetails = stepContext.options;

        if (!bookingDetails.personName) {
            return await stepContext.prompt(TEXT_PROMPT, { prompt: 'What is your name?' });
        } else {
            return await stepContext.next(bookingDetails.personName);
        }
    }

    async finalStep(stepContext) {
        // capturing result from previous step
        const bookingDetails = stepContext.options;
        bookingDetails.personName = stepContext.result;

        if (stepContext.result) {
            return await stepContext.endDialog(bookingDetails);
        }
    }
}
module.exports.MeetAndGreetDialog = MeetAndGreetDialog;
