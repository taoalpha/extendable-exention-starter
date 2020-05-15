## An extendable extension starter

You can clone this and start creating extensions that have great extendability!

All features will automatically have an entry in options page that allow you to turn on / off and set configurations.

## How to use

To add a feature, just create a new ts file in `features` folder extends following class:

``` typescript
/**
 * Interface for FeatureConfig.
 */
export abstract class Feature {
  abstract name: string;
  abstract description: string;
  protected teardownQueue: Array<() => void> = [];

  // default value, this value will be updated from storage when load
  value?: string;

  // default all opt-in
  // also will be the value for boolean features
  enabled: boolean = false;

  // execution order will follow the priority number
  priority: number = 0;

  // stats
  stats: FeatureStats = {
    runTimes: 0,
    failures: [],
  };

  constructor(protected api: Alfred) {}

  // return true if should run this feature
  abstract async shouldRun(): Promise<boolean>;

  // Execution when enabled
  abstract async run(): Promise<void>;

  // Validate if value is valid
  async validate(value?: string): Promise<boolean> {
    return true;
  }

  // clean up when feature is disabled
  async cleanup(): Promise<void> {
    // Anything you want to teardown before a new run or after disabled
    // add it to the queue
    this.teardownQueue.forEach(tdfn => {
      tdfn();
    });
    return;
  }

  // format value before save, but always store as string
  format(value?: string): string {
    return value || '';
  }
}
```

And then add it to the `features/index.ts`, the rest will be taken care of by the extension :)
