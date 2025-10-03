
export enum Severity {
    Critical = 'Critical',
    Major = 'Major',
    Minor = 'Minor',
    Suggestion = 'Suggestion'
}

export interface ReviewSuggestion {
    severity: Severity;
    category: string;
    description: string;
    code_snippet: string;
}
