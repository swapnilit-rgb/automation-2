import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";


const createSession = async () => {
  try {
    const bb = new Browserbase({
      apiKey: process.env.BROWSERBASE_API_KEY || 'bb_live_LqBAuJfiOZ7gJDuSzY4rKAQ6Was'
    });
    const session = await bb.sessions.create({
      projectId: process.env.BROWSERBASE_PROJECT_ID || 'edeab270-64a6-4820-9945-f5d0f5b61390'
    });

    //Connect to the session
    const browser = await chromium.connectOverCDP(session.connectUrl);

    // Getting the default context to ensure the sessions are recorded.
    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[0];

    return {
      session,
      page
    };
    } catch (error) {
    console.error(error.message);
    throw error;
  }

};

export default createSession;