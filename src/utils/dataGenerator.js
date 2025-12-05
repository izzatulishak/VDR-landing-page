// Utility to generate realistic dummy data for exploration blocks

const basins = [
    "North Sumatra Basin", "Central Sumatra Basin", "South Sumatra Basin",
    "Sunda Basin", "West Java Basin", "East Java Basin",
    "Barito Basin", "Kutei Basin", "Tarakan Basin",
    "Makassar Strait Basin", "Bone Basin", "Seram Basin",
    "Bintuni Basin", "Salawati Basin", "Timor Basin"
];

const operators = [
    "Pertamina EP", "ExxonMobil", "BP Berau Ltd", "Chevron Pacific Indonesia",
    "Eni Indonesia", "ConocoPhillips", "Petronas Carigali", "Repsol",
    "Inpex Corporation", "Husky Energy", "Premier Oil", "Mubadala Petroleum"
];

const statuses = ["Upcoming", "Running", "Pending", "Conditional", "Open"];

const licenseTypes = ["Production Sharing Contract (PSC)", "Gross Split PSC", "Joint Study"];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomFloat = (min, max, decimals = 2) => (Math.random() * (max - min) + min).toFixed(decimals);

const generateBlockName = () => {
    const prefixes = ["North", "South", "East", "West", "Central", "Deepwater", "Offshore", "Onshore"];
    const names = ["Natuna", "Java", "Sumatra", "Kalimantan", "Papua", "Sulawesi", "Timor", "Arafura", "Mahakam", "Barito"];
    const suffixes = ["Block", "Area", "Extension", "Working Area"];

    return `${getRandomItem(prefixes)} ${getRandomItem(names)} ${getRandomItem(suffixes)} ${getRandomInt(1, 9)}`;
};

export const generateBlockData = (baseData) => {
    const isOffshore = Math.random() > 0.3;
    const status = baseData.status || getRandomItem(statuses);
    const basin = getRandomItem(basins);
    const operator = getRandomItem(operators);

    return {
        block_id: `ID-${getRandomInt(1000, 9999)}`,
        name: baseData.blockName || baseData.namobj || generateBlockName(),
        licensing_round: `Indonesia Bid Round ${getRandomInt(2023, 2025)}`,
        status: status,
        basin: basin,
        area_km2: getRandomInt(1500, 12000).toLocaleString(),
        operator: operator,
        licence_start: `${getRandomInt(2020, 2024)}-01-01`,
        licence_end: `${getRandomInt(2030, 2050)}-12-31`,
        seismic: {
            "2D_km": getRandomInt(500, 5000),
            "3D_km2": getRandomInt(0, 2000),
            packages: [
                `Seismic Package ${getRandomInt(1, 5)} (${getRandomInt(1990, 2010)})`,
                `Reprocessed 2D Lines (${getRandomInt(2015, 2020)})`
            ]
        },
        wells: {
            total_wells: getRandomInt(0, 15),
            discovery_wells: getRandomInt(0, 5),
            latest_discovery: Math.random() > 0.5 ? `${getRandomInt(2010, 2023)}` : "None"
        },
        infrastructure: [
            isOffshore ? "Nearest Platform: 45km" : "Access Road: 10km",
            `Pipeline Connection: ${getRandomInt(20, 150)}km`,
            "Processing Facility: Available"
        ],
        metrics: {
            est_recoverable_mmboe: getRandomInt(50, 500),
            water_depth_m: isOffshore ? getRandomInt(50, 1500) : 0,
            license_type: getRandomItem(licenseTypes)
        },
        notes: `This ${status.toLowerCase()} block is located in the ${basin}. It shows strong potential with ${getRandomInt(2, 5)} identified prospects. Previous exploration by ${operator} indicated active petroleum systems.`,
        ctas: {
            open_data_room: true,
            download_seismic: true
        }
    };
};
