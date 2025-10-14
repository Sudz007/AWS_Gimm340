const connection = require('./connection');

// Get all characters with their arcs
async function getAll(parameters = {}) {
    let selectSql = `
    SELECT 
        unholy_characters.id AS characterId,
        unholy_characters.name,
        unholy_characters.age,
        unholy_characters.gender,
        unholy_characters.nationality,
        unholy_characters.role,
        unholy_characters.backstory,
        unholy_characters.image,
        GROUP_CONCAT(character_arcs.arc_name SEPARATOR ', ') AS arcs,
        GROUP_CONCAT(character_arcs.arc_chapters SEPARATOR ', ') AS arcChapters,
        GROUP_CONCAT(character_arcs.arc_summary SEPARATOR ', ') AS chapterSummary
    FROM characters_to_arcs
    INNER JOIN unholy_characters ON characters_to_arcs.character_id = unholy_characters.id
    INNER JOIN character_arcs ON characters_to_arcs.arc_id = character_arcs.arc_id`;

    let whereStatements = [];
    let queryParameters = [];

    if (typeof parameters.name !== 'undefined' && parameters.name.trim() !== '') {
        whereStatements.push('unholy_characters.name LIKE ?');
        queryParameters.push('%' + parameters.name.trim() + '%');
    }

    if (typeof parameters.gender !== 'undefined' && parameters.gender.trim() !== '') {
        whereStatements.push('unholy_characters.gender = ?');
        queryParameters.push(parameters.gender.trim());
    }

    if (typeof parameters.nationality !== 'undefined' && parameters.nationality.trim() !== '') {
        whereStatements.push('unholy_characters.nationality = ?');
        queryParameters.push(parameters.nationality.trim());
    }

    if (typeof parameters.role !== 'undefined' && parameters.role.trim() !== '') {
        whereStatements.push('unholy_characters.role = ?');
        queryParameters.push(parameters.role.trim());
    }

    if (typeof parameters.age !== 'undefined' && parseInt(parameters.age) > 0) {
        whereStatements.push('unholy_characters.age = ?');
        queryParameters.push(parseInt(parameters.age));
    }

    if (whereStatements.length > 0) {
        selectSql += ' WHERE ' + whereStatements.join(' AND ');
    }

    selectSql += ' GROUP BY unholy_characters.id';

    // ORDER BY if client gives it
    if (typeof parameters.sortField !== 'undefined' && typeof parameters.sortDirection !== 'undefined') {
        const field = parameters.sortField;
        const direction = parameters.sortDirection.toUpperCase();
        if (['name', 'age', 'gender', 'nationality', 'role'].includes(field) && ['ASC', 'DESC'].includes(direction)) {
            selectSql += ` ORDER BY unholy_characters.${field} ${direction}`;
        }
    }

    // LIMIT 
    if (typeof parameters.limit !== 'undefined' && parseInt(parameters.limit) > 0) {
        selectSql += ' LIMIT ' + parseInt(parameters.limit);
    }

    try {
        const characters = await connection.query(selectSql, queryParameters);

        for (const character of characters) {
            if (character.image) {
                character.image = character.image.toString('base64');
            }
        }

        return characters;
    } catch (error) {
        console.error('Error fetching characters:', error.message);
        throw new Error('Failed to fetch characters from the database.');
    }
}





async function getById(id) {
    let selectSql = `SELECT * FROM unholy_characters WHERE id = ?`;
    queryParameters = [id];
    //STOP! Run this database query then return the results
    return await connection.query(selectSql, queryParameters);
}
async function getAllArcs() {
    const selectSql = `SELECT arc_id, arc_name, arc_chapters FROM character_arcs`;
    try {
        return await connection.query(selectSql, []);
    } catch (error) {
        console.error('Error fetching arcs:', error.message);
        throw new Error('Failed to fetch arcs from the database.');
    }
}
// Insert a new character and their arc
async function insert(parameters = {}) {
    let insertCharacterSQL = `
        INSERT INTO unholy_characters (name, age, gender, nationality, role, backstory, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        characterQueryParameters = [
            parameters.name,
            parameters.age,
            parameters.gender,
            parameters.nationality,
            parameters.role,
            parameters.backstory,
            parameters.image || null
        ];

    let characterResult = await connection.query(insertCharacterSQL, characterQueryParameters),
        characterId = characterResult.insertId;

    let insertArcSQL = `
        INSERT INTO character_arcs (arc_name, arc_chapters, arc_summary)
        VALUES (?, ?, ?)`,
        arcQueryParameters = [
            parameters.arc,
            parameters.arcChapters,
            parameters.chapterSummary
        ];

    let arcResult = await connection.query(insertArcSQL, arcQueryParameters),
        arcId = arcResult.insertId;

    let insertRelationshipSQL = `
        INSERT INTO characters_to_arcs (character_id, arc_id)
        VALUES (?, ?)`,
        relationshipQueryParameters = [characterId, arcId];

    await connection.query(insertRelationshipSQL, relationshipQueryParameters);

    return { characterId, arcId };
}

// Edit an existing character and their arc
async function edit(id, parameters = {}) {
    let updateCharacterSQL = `
        UPDATE unholy_characters
        SET name = ?, age = ?, gender = ?, nationality = ?, role = ?, backstory = ?, image = ?
        WHERE id = ?`,
        characterQueryParameters = [
            parameters.name,
            parameters.age,
            parameters.gender,
            parameters.nationality,
            parameters.role,
            parameters.backstory,
            parameters.image || null,
            id
        ];

    await connection.query(updateCharacterSQL, characterQueryParameters);

    let updateArcSQL = `
        UPDATE character_arcs
        SET arc_name = ?, arc_chapters = ?, arc_summary = ?
        WHERE arc_id = (SELECT arc_id FROM characters_to_arcs WHERE character_id = ?)`,
        arcQueryParameters = [
            parameters.arc,
            parameters.arcChapters,
            parameters.chapterSummary,
            id
        ];

    return await connection.query(updateArcSQL, arcQueryParameters);
}


async function remove(id) {
    try {
        // First delete all relationships
        await connection.query(`DELETE FROM characters_to_arcs WHERE character_id = ?`, [id]);

        // Then delete the character
        await connection.query(`DELETE FROM unholy_characters WHERE id = ?`, [id]);

        return { message: 'Character and relationships deleted successfully.' };
    } catch (error) {
        console.error('Error in DELETE /unholy/:id/ endpoint:', error.message);
        throw new Error('Failed to delete character.');
    }
}


module.exports = {
    getAll,
    getById,
    getAllArcs,
    insert,
    edit,
    remove
};
