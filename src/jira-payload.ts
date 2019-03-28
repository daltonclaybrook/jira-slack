interface JiraPayload {
    user: User;
    issue: Issue;
    changelog: Changelog;
}

interface User {
    accountId: string;
    name: string;
    emailAddress: string;
    displayName: string;
    avatarUrls: {
        '48x48': string;
    };
}

interface Issue {
    id: string;
    key: string;
    fields: IssueFields;
}

interface IssueFields {
    summary: string;
    status: Status | null;
    reporter: User | null;
    issuetype: IssueType | null;
    project: Project | null;
    description: string | null;
}

interface Changelog {
    id: string;
    items: ChangelogItem[];
}

interface ChangelogItem {
    field: string;
    fieldId: string;
    fromString: string;
    toString: string;
}

interface Status {
    name: string;
}

interface IssueType {
    name: string;
}

interface Project {
    id: string;
    key: string;
    name: string;
    avatarUrls: {
        '48x48': string;
    };
}

export { JiraPayload, Issue, User, Changelog };
