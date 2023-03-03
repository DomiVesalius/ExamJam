module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/preset-create-react-app',
        'storybook-addon-react-router-v6'
    ],
    framework: '@storybook/react',
    env: (config) => ({ ...config, REACT_APP_SERVER_ENDPOINT: 'http://localhost:8080/api' }),
    core: {
        builder: '@storybook/builder-webpack5'
    }
};
