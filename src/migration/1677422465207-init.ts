import { MigrationInterface, QueryRunner } from "typeorm";

export class init1677422465207 implements MigrationInterface {
    name = 'init1677422465207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`content\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`slug\` varchar(300) NOT NULL, \`description\` varchar(250) NOT NULL, \`fullContent\` text NOT NULL, \`isActive\` tinyint NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` int NULL, UNIQUE INDEX \`IDX_dfe3ab560d448427f463febbe7\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`isActive\` tinyint NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`content\` ADD CONSTRAINT \`FK_dedf4676dc7654f0320fcdc5d53\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content\` DROP FOREIGN KEY \`FK_dedf4676dc7654f0320fcdc5d53\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_dfe3ab560d448427f463febbe7\` ON \`content\``);
        await queryRunner.query(`DROP TABLE \`content\``);
    }

}
