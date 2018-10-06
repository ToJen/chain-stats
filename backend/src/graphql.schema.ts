export class Options {
    noOfUsers?: number;
}

export abstract class IMutation {
    abstract parseContract(data?: string): string | Promise<string>;

    abstract go(options?: Options): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract userResult(): string | Promise<string>;
}
