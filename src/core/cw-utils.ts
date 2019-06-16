import {HttpService, Injectable} from '@nestjs/common';
import * as moment from "moment";

moment.locale('ru');

@Injectable()
export class CWUtils {
  private tokenCrierbot = 'dHJ7upRGZ6lWyk54zj2OgYoUEqNFbVX8';

  constructor(private httpService: HttpService) {
  }

  public selectFieldByObject(obj: any, fields: string[]): any {
    let res = {};
    fields.forEach(field => {
      if (obj[field] !== undefined) {
        res[field] = obj[field]
      }
    });
    return res;
  }

  public translit(text: string) {
    text = text.toLowerCase();
    // Символ, на который будут заменяться все спецсимволы
    const space = '-';

    let TrimStr = (s) => {
      s = s.replace(/^-/, '');
      return s.replace(/-$/, '');
    };

    // Массив для транслитерации
    const transl = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
      'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
      ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
      '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
      '(': space, ')': space, '-': space, '\=': space, '+': space, '[': space,
      ']': space, '\\': space, '|': space, '/': space, '.': space, ',': space,
      '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
      '?': space, '<': space, '>': space, '№': space, '«': space, '»': space
    };

    let result = '';
    let curent_sim = '';

    for(let i=0; i < text.length; i++) {
      // Если символ найден в массиве то меняем его
      if(transl[text[i]] != undefined) {
        if(curent_sim != transl[text[i]] || curent_sim != space){
          result += transl[text[i]];
          curent_sim = transl[text[i]];
        }
      }
      // Если нет, то оставляем так как есть
      else {
        result += text[i];
        curent_sim = text[i];
      }
    }

    return TrimStr(result).toLowerCase();
  }

  public async sendMessage(message: string) {
    return await this.httpService.get(`http://crierbot.appspot.com/${this.tokenCrierbot}/send?message=${encodeURIComponent(message)}`).toPromise();
  }

  public formatDate(date: string | Date) {
    const dt = moment(date).format('L');
    const time = moment(date).format('LT');

    return `${dt} в ${time}`;
  }

  public formatToPremium(date: Date) {
    return moment(date).format('YYYY-MM-DD HH:mm')
  }

  public withZero(num) {
    return num < 10 ? '0' + num : num;
  }
}
