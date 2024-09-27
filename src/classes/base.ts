export abstract class base {
	abstract str(): string;
	abstract valueOf(): number;

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}
}
