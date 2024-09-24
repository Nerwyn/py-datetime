export abstract class base {
	abstract str(): string;

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}
}
