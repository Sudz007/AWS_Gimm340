//unholy is the noun for this model class

const connection = require('./connection');

async function getAll(parameters = {}) {
    const selectSql = `
        SELECT 
    unholy_characters.id AS characterId,
    unholy_characters.name,
    unholy_characters.age,
    unholy_characters.gender,
    unholy_characters.nationality,
    unholy_characters.role,
    unholy_characters.backstory,
    unholy_characters.image,
    GROUP_CONCAT(character_arcs.arc_name SEPARATOR ', ') AS arcs
FROM characters_to_arcs
INNER JOIN unholy_characters ON characters_to_arcs.character_id = unholy_characters.id
INNER JOIN character_arcs ON characters_to_arcs.arc_id = character_arcs.arc_id
GROUP BY unholy_characters.id;`; // Updated query to fetch all required fields
    const queryParameters = [];

    return await connection.query(selectSql, queryParameters);
}


// Get all available arcs
async function getAllArcs() {
const selectSql = `SELECT arc_id, arc_name, arc_chapters FROM character_arcs`;
try {
    return await connection.query(selectSql, []);
} catch (error) {
    console.error('Error fetching arcs:', error.message);
    throw new Error('Failed to fetch arcs from the database.');
}
}

module.exports = {
getAll,
getAllArcs
};