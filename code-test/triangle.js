function main(input) {
    let parts = input.split(/\s+/).map(Number);

    let base = parts[0];
    let height = parts[1];

    let area = (base * height) / 2;

    console.log(Math.floor(area));
}

let input = "";

process.stdin.on('data', (chunk) => {
    input += chunk;
});

process.stdin.on('end', () => {
    main(input.trim());
});