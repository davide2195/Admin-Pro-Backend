

const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu:[
            { title: 'Main', url: '/' },
            { title: 'Chart', url: '/dashboard/grafica1' },
            { title: 'ProgresssBar', url: '/dashboard/progress' },
            { title: 'Promises', url: '/dashboard/promesas' },
            { title: 'rxjs', url: '/dashboard/rxjs' },
    
          ]
        },
    
        {
          title: 'Mantenimientos',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Usuarios', url: 'usuarios' },
            { title: 'Hospitales', url: 'hospitales' },
            { title: 'Médicos', url: 'medicos' },
          ]
        },
      ];

    if ( role === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ title: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}