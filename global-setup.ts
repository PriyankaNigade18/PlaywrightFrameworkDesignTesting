import { createAllureEnvironment } from './src/allure/alluer_create_environment.js';

async function globalSetup() {
    console.log("===== GLOBAL SETUP STARTED =====");

    createAllureEnvironment();

    console.log("===== ALLURE ENVIRONMENT FILE CREATED =====");
}

export default globalSetup;