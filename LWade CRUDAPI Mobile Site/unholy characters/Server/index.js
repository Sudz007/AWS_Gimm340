// Libraries
const express = require('express');
const multer = require('multer');
const { validationResult } = require('express-validator');
const character = require('./Model/character');
const unholy = require('./Model/unholy');
const { characterNameValidation, characterAgeValidation, genderValidation, nationalityValidation, roleValidation, backstoryValidation, arcValidation, arcChaptersValidation, chapterSummaryValidation } = require('./validation');

// Setup defaults for script
const app = express();
//app.use(cors());
app.use(express.static("public"));
const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage: storage });

//Stylesheet
//app.use(express.static(__dirname + '/public'));
//Webpage
//app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


const port = 3000;

// JSON of characters from the database
app.get('/character/', upload.none(), async (request, response) => {
    try {
        const result = await character.getAll();
        response.json({ 'data': result });
    } catch (error) {
        console.error('Error in /character/ endpoint:', error.message);
        return response
            .status(500)
            .json({ message: 'Something went wrong with the server.' });
    }
});

app.get('/unholy/', upload.none(), async (request, response) => {
    try {
        const characters = await unholy.getAll(request.query);
        const arcs = await unholy.getAllArcs();
        if ((!characters || characters.length === 0) && (!arcs || arcs.length === 0)) {
            return response.status(404).json({ message: 'No data found.' });
        }
        response.json({ characters: characters, arcs: arcs });
    } catch (error) {
        console.error('Error in /unholy/ endpoint:', error.message);
        return response
            .status(500)
            .json({ message: 'Failed to fetch characters or arcs from the server.' });
    }
});

app.get('/unholy/:id/', upload.none(), async (request, response) => {
    try {
        const result = await unholy.getById(request.params.id);
        response.json({ 'data': result });
    } catch (error) {
        console.error('Error in /unholy/:id/ endpoint:', error.message);
        return response
            .status(500)
            .json({ message: 'Something went wrong with the server.' });
    }
});

app.post(
    '/unholy/',
    upload.fields([{ name: 'characterImage', maxCount: 1 }]),
    ...[
        characterNameValidation,
        characterAgeValidation,
        genderValidation,
        nationalityValidation,
        roleValidation,
        backstoryValidation,
        arcValidation,
        arcChaptersValidation,
        chapterSummaryValidation
    ],
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }

        try {
            const newCharacter = {
                name: request.body.characterName || null, // 🔥 Map properly
                age: request.body.characterAge || null,
                gender: request.body.gender || null,
                nationality: request.body.nationality || null,
                role: request.body.role || null,
                backstory: request.body.backstory || null,
                image: request.files && request.files.characterImage
                    ? request.files.characterImage[0].buffer
                    : null,
                arc: request.body.arc || null,
                arcChapters: request.body.arcChapters || null,
                chapterSummary: request.body.chapterSummary || null
            };
              

            console.log('Data being inserted:', newCharacter); // 🔥 Double check!

            await unholy.insert(newCharacter);
            response.json({ 'data': 'Character added successfully!' });
        } catch (error) {
            console.error('Error in POST /unholy/ endpoint:', error.message);
            return response
                .status(500)
                .json({ message: 'Something went wrong with the server.' });
        }
    }
);



app.put(
    '/unholy/:id/',
    upload.fields([{ name: 'characterImage', maxCount: 1 }]),
    [
      characterNameValidation,
      characterAgeValidation,
      genderValidation,
      nationalityValidation,
      roleValidation,
      backstoryValidation,
      arcValidation,
      arcChaptersValidation,
      chapterSummaryValidation
    ],
    async (request, response) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          message: 'Request fields or files are invalid.',
          errors: errors.array(),
        });
      }
  
      try {
        const updatedCharacter = {
          name: request.body.characterName || null,
          age: request.body.characterAge || null,
          gender: request.body.gender || null,
          nationality: request.body.nationality || null,
          role: request.body.role || null,
          backstory: request.body.backstory || null,
          arc: request.body.arc || null,
          arcChapters: request.body.arcChapters || null,
          chapterSummary: request.body.chapterSummary || null,
          image: request.files && request.files.characterImage
            ? request.files.characterImage[0].buffer
            : null
        };
  
        console.log('Data being updated:', updatedCharacter); // 🔥 Check this when testing
  
        await unholy.edit(request.params.id, updatedCharacter);
        response.json({ 'data': 'Character updated successfully!' });
      } catch (error) {
        console.error('Error in PUT /unholy/:id/ endpoint:', error.message);
        return response.status(500).json({ message: 'Something went wrong with the server.' });
      }
    }
  );

app.delete('/unholy/:id/', async (request, response) => {
    try {
        await unholy.remove(request.params.id);
        response.json({ 'data': 'Character deleted successfully!' });
    } catch (error) {
        console.error('Error in DELETE /unholy/:id/ endpoint:', error.message);
        return response
            .status(500)
            .json({ message: 'Something went wrong with the server.' });
    }
});

// Start server
app.listen(port);
