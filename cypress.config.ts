import { defineConfig } from 'cypress';
import webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

const config = defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    baseUrl: 'http://localhost:5500',
    video: false,
    supportFile: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor', webpack({
        webpackOptions: {
          resolve: {
            extensions: ['.ts'],
          },
          module: {
            rules: [
              {
                test: /\.feature$/,
                use: [
                  {
                    loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                    options: config,
                  },
                ],
              },
            ],
          },
        },
      }));

      on('task', {
        log(message: string) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
  },
});

export default config;
