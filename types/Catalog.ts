interface Formats {
    local: boolean;
    online: boolean;
    home: boolean;
}

interface Filters {
    schedule: null | string;
    formats: Formats;
}