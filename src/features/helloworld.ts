import { Alfred, Feature } from '../api';

class HelloWorld extends Feature {
    name = 'demo feature - hello world';
    description = 'Print hello world in your console on every page';
    enabled = true;

    async shouldRun() {
        return true;
    }

    async run() {
        console.log('hello world!');
    }
}

Alfred.registerFeature(HelloWorld);