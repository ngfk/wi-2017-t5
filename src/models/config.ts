import * as config from '../config.json';

export class Config {
    public static get<T extends ConfigType>(type: T): ConfigMap[T] {
        return config[type];
    }

    public static log<T extends keyof LoggingConfig>(type: T): boolean {
        return config['logging'][type];
    }
}

export enum ConfigType {
    Conversation = 'conversation',
    NaturalLanguageUnderstanding = 'natural-language-understanding',
    VisualRecognition = 'visual-recognition',
    Logging = 'logging'
}

export interface ConfigMap {
    conversation: ConversationConfig;
    'natural-language-understanding': NaturalLanguageUnderstandingConfig;
    'visual-recognition': VisualRecognitionConfig;
    logging: LoggingConfig;
}

export interface ConversationConfig {
    readonly username: string;
    readonly password: string;
    readonly workspace: string;
}

export interface NaturalLanguageUnderstandingConfig {
    readonly username: string;
    readonly password: string;
}

export interface VisualRecognitionConfig {
    readonly api_key: string;
    readonly custom_classifier_id: string;
}

export interface LoggingConfig {
    'post-parsing': boolean;
}
