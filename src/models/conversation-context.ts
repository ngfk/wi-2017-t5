export class ConversationContext {
    public crawled: boolean;
    public enough_preferences: boolean;
    public matching_city: string;
    public preferences: string;
    public reasons_for_visiting: string;
    public reasons_of_match: string;

    constructor() {
        this.enough_preferences = false;
    }
}

export type ConversationVariable = keyof ConversationContext;
