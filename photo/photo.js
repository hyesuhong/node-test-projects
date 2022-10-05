const process = require('process');
const path = require('path');
const fs = require('fs');

const args = process.argv;
const targetFolder = args[2];
if (targetFolder) {
	console.log(targetFolder);
} else {
	console.error('There is no folder name. insert folder name!');
	return;
}

const parentF = __dirname.split('dream_node')[0];
const picture = path.join(parentF, 'picture', targetFolder);

fs.readdir(picture, (error, files) => {
	if (error !== null) {
		console.log('error', error);
		return;
	}

	files.forEach((file) => {
		const dir = path.join(picture, file);
		const ext = path.extname(dir);

		if (ext.includes('mp4') || ext.includes('mov')) {
			console.log(dir, 'video');
		} else if (ext.includes('png') || ext.includes('aae')) {
			console.log(dir, 'captured');
		} else if (ext.includes('jpg')) {
			if (file.includes('_e') || file.includes('_E')) {
				console.log(dir, 'original');
			} else {
				console.log(dir, 'dupicated');
			}
		} else {
			console.log(dir, 'original');
		}
	});
	// mp4, mov => video
	// png, aae => captured
	// jpg original => duplicated
});
