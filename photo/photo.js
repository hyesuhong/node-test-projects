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

	files.forEach(async (file) => {
		const dir = path.join(picture, file);
		const ext = path.extname(dir);

		let folderName = '';

		if (ext.includes('mp4') || ext.includes('mov')) {
			folderName = 'video';
		} else if (ext.includes('png') || ext.includes('aae')) {
			folderName = 'captured';
		} else if (ext.includes('jpg')) {
			if (file.includes('_e') || file.includes('_E')) {
			} else {
				folderName = 'dupicated';
			}
		} else {
		}

		if (folderName !== '') {
			const newDir = path.join(picture, folderName);
			await fs.promises
				.mkdir(newDir)
				.then(async () => {
					await moveFile(dir, path.join(newDir, file));
				})
				.catch(async (err) => {
					if (err.code === 'EEXIST') {
						await moveFile(dir, path.join(newDir, file));
					} else {
						console.log(file, error);
					}
				});
		}
	});
});

function moveFile(oldDir, newDir) {
	const file = path.basename(oldDir);
	const newDirArr = newDir.split(path.sep);
	const folderName = newDirArr[newDirArr.length - 2];

	fs.promises
		.rename(oldDir, newDir)
		.then(() => console.log(`move ${file} to ${folderName}`))
		.catch(console.error);
}

/*
작업한 환경
node
	└dream_node
	│	└projects
	│		└photo
	└picture
		└test
*/
