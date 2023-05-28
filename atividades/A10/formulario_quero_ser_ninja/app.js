const masks = {
    cpf(value) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})./, '$1')
    },
    cnpj(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})./, '$1')
    },
    phone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d)/, '($1')
            .replace(/(\d{2})(\d)/, '$1) $2')
            // .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})./, '$1')
    },
    phoneDDI(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d)/, '+$1')
            .replace(/(\d{2})(\d)/, '$1 ($2')
            .replace(/(\d{2})(\d)/, '$1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})./, '$1')
    },
    cep(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})./, '$1')
    },
    pis(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{5})(\d)/, '$1.$2')
            .replace(/(\d{5}).(\d{2})(\d)/, '$1.$2-$3')
            .replace(/(-\d)./, '$1')
    },
    // não precisava, o video vai até pis
    // money(value) {
    //     return value
    //         .replace(/\D+/g, '')
    //         .replace(/(\d)/, 'R$ $1')
    //         .replace(/(\d{1,3})(\d{3})/g, '$1.$2')
    //         // .replace(/(\d+)(\d{2}?)/, '$1,$2')
    // }
};

document.querySelectorAll('input').forEach(($input) => {
    const field = $input.dataset.js

    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value)
    }, false)
})