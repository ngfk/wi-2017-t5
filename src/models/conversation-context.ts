export interface ConversationContext {
    crawled: boolean;
    enough_preferences: boolean;
    matching_city: string;
    reasons_of_match: string;
}

export type ConversationVariable = keyof ConversationContext;
