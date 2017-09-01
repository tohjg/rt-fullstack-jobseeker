export class Vacancy {
    constructor(
        public id: number,
        public position: string,
        public specs: string,
        public loc: string,
        public salary_min: number,
        public salary_max: number,
        public ctc_name: string,
        public ctc_phone: string,
        public ctc_email: string
    ) {}
}