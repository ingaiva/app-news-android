
export function getEmptyArticle() {
  return {
    title: '',
    author: '',
    source: '',
    description: '',
    content: '',
    url: '',
    urlToImage: '',
    publishedAt: '',
  };
}

export function getArticle(data) {
  return {
    title: data?.title,
    author: data?.author,
    source: data?.source?.name,
    description: data?.description,
    content: getContentTexte(data?.content),
    url: data?.url,
    urlToImage: data?.urlToImage,
    publishedAt: getDateAsStr(data?.publishedAt),
  };
}

export function getEmptyUser() {
  return {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',    
    isConnected:false,
  };
}

export function getContentTexte(texte) {
  if (texte) {
    let idx = texte.indexOf('[+');
    if (idx > 0) return texte.substring(0, idx);
  } else return '';
}

export function getDateAsStr(strDate) {
  if (strDate) {
    let dt = new Date(strDate);
    return formatDate(dt);
  } else return '';
}
export function formatDate(dt) {
  if (dt) {
    try {
      let weekdays = new Array();
      weekdays[0] = 'dimanche';
      weekdays[1] = 'lundi';
      weekdays[2] = 'mardi';
      weekdays[3] = 'mercredi';
      weekdays[4] = 'jeudi';
      weekdays[5] = 'vendredi';
      weekdays[6] = 'samedi';

      let d = new Date(dt);
      let jour = d.getDate();
      let mois = d.getMonth();
      let annee = d.getFullYear();
      let ww = d.getDay();
      let hh = d.getHours();
      let minutes = d.getMinutes();

      mois++;
      if (jour < 10) jour = '0' + jour;
      if (mois < 10) mois = '0' + mois;
      if (hh < 10) hh = '0' + hh;
      if (minutes < 10) minutes = '0' + minutes;

      var retVal =
        weekdays[ww] +
        ' ' +
        jour +
        '/' +
        mois +
        '/' +
        annee +
        ' ' +
        hh +
        ':' +
        minutes;
      return retVal;
    } catch (e) {
      console.log('renderDateAsStr : ' + e);
    }
  }
  return '';
}
