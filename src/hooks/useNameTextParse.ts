export const useNameTextParse = (pName: string): string => {
	let name = String(pName).toLowerCase();
	let names = name.split(" ");
	let upperChar = names.map((str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});
	let fullname = "";
	for (var i = 0; i < upperChar.length; i++) {
		fullname = fullname + " " + upperChar[i];
	}
	return fullname;
};
