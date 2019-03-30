import slugify from 'slugify';

const customSlugify = value => {
    return slugify(value).toLowerCase();
}

export default customSlugify;
