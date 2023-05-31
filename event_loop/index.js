const fs = require('fs');
const path = require('path');

const path_of_directory = './files'; 

function processFile(file) {
  console.log(`Processing file: ${file}`);
}

// Event loop function
let eventLoop = () => {
  fs.readdir(path_of_directory, (err, files) => {
    if (err) {
      console.error('Error:', err);
      return;
    }

    files.forEach((file) => {
      const path_of_file = path.join(path_of_directory, file);
      fs.stat(path_of_file, (err, stats) => {
        if (err) {
          console.error('Error:', err);
          return;
        }

        if (stats.isFile()) {
          processFile(path_of_file);
        }
      });
    });
  });
}

fs.watch(path_of_directory, (type_of_event, name_of_file) => {
  console.log(`File ${name_of_file} changed. Event type: ${type_of_event}`);

  eventLoop();
});

eventLoop();
