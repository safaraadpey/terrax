#!/usr/bin/env node

import fs from "fs";
import YAML from "yaml";

const command = process.argv[2];

if (!command || command === "help") {
  console.log(`
Terrax v0.1

Usage:
  tx status
`);
  process.exit(0);
}

if (command === "status") {
  if (!fs.existsSync("terrax.yml")) {
    console.error("terrax.yml not found");
    process.exit(1);
  }

  const file = fs.readFileSync("terrax.yml", "utf8");
  const config = YAML.parse(file);

  console.log(`Terrax v0.1`);
  console.log(`Project: ${config.name || "unknown"}`);
  console.log("");

  const services = config.services || {};

  for (const [name, service] of Object.entries(services)) {
    console.log(`${name.padEnd(10)} ✓ ${service.provider || service.type || "configured"}`);
  }

  process.exit(0);
}

console.error(`Unknown command: ${command}`);
process.exit(1);