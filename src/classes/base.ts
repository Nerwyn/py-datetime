export abstract class base {
	abstract toString(): string;
	abstract valueOf(): number;

	toJSON() {
		return this.toString();
	}
}
