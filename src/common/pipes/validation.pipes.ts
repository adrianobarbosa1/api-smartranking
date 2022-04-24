import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidationParametrosPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(`o valor do parametro deve ser informado`)
        }
        return value
    }
}