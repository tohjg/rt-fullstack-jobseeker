export class Vacancy {
    constructor(
        public id: number = null,
        public position: string = null,
        public specs: string[] = null,
        public location: string = null,
        public salary_range: number[] = [9000, 60000],
        public ctc_name: string = null,
        public ctc_phone: string = null,
        public ctc_email: string = null
    ) {}
}