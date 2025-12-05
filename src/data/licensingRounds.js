export const licensingRounds = [
    {
        id: 1,
        name: "North Sumatra Basin Block A",
        status: "running", // yellow
        region: "Western Indonesia",
        coordinates: [98.0, 3.5], // approx lat/long
        summary: "High potential gas play in the prolific North Sumatra Basin.",
        deadline: "2025-12-31",
        qualification: "Operator experience in deep water required.",
        fiscalTerms: "Production Sharing Contract (PSC) - Cost Recovery",
        type: "Offshore"
    },
    {
        id: 2,
        name: "Central Java Onshore Block",
        status: "pending", // light green
        region: "Central Indonesia",
        coordinates: [110.0, -7.0],
        summary: "Onshore oil opportunity with existing infrastructure nearby.",
        deadline: "2025-10-15",
        qualification: "Standard financial capability.",
        fiscalTerms: "Gross Split PSC",
        type: "Onshore"
    },
    {
        id: 3,
        name: "East Kalimantan Deepwater",
        status: "upcoming", // light purple
        region: "Western Indonesia",
        coordinates: [118.0, 1.0],
        summary: "Frontier deepwater exploration block.",
        deadline: "TBA",
        qualification: "Major international operator preferred.",
        fiscalTerms: "Flexible Terms Available",
        type: "Offshore"
    },
    {
        id: 4,
        name: "Papua Frontier Block",
        status: "open", // brown
        region: "Eastern Indonesia",
        coordinates: [135.0, -4.0],
        summary: "Large frontier acreage with significant upside potential.",
        deadline: "Open Application",
        qualification: "Consortium bids encouraged.",
        fiscalTerms: "Special Incentive Package",
        type: "Onshore"
    },
    {
        id: 5,
        name: "Natuna Sea Block B",
        status: "conditional", // dark green
        region: "Western Indonesia",
        coordinates: [108.0, 4.0],
        summary: "Conditionally awarded pending final signature.",
        deadline: "Closed",
        qualification: "N/A",
        fiscalTerms: "Cost Recovery PSC",
        type: "Offshore"
    }
];

export const statusColors = {
    upcoming: "#D8B4FE", // Light Purple
    running: "#FDE047", // Yellow
    pending: "#86EFAC", // Light Green
    conditional: "#15803D", // Dark Green
    open: "#A97142"     // Brown
};
