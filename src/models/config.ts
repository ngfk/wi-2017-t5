import * as config from '../config.json';

export class Config {
    public static get<T extends ConfigType>(type: T): ConfigMap[T] {
        return config[type];
    }
}

export enum ConfigType {
    Conversation = 'conversation',
    NaturalLanguageUnderstanding = 'natural-language-understanding',
    VisualRecognition = 'visual-recognition'
}

export interface ConfigMap {
    conversation: ConversationConfig;
    'natural-language-understanding': NaturalLanguageUnderstandingConfig;
    'visual-recognition': VisualRecognitionConfig;
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
}
