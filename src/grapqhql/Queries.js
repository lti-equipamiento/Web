import { gql } from "apollo-boost";

//Auth0  sign up query
export function getAPIToken(data) {
  return `
  {
    "email": "${data.mail}",
    "connection": "Username-Password-Authentication",
    "password": "Agem1234",
    "email_verified": false,
    "verify_email": false,
  }
  `;
}

//----------------------------------Usuarios--------------------------------------------

export function getUsuarios() {
  return gql`
    query getUsuarios {
      data_usuario {
        id
        nombre
        mail
        telefono
        direccion
        cedula
        rol
      }
    }
  `;
}

export function addUsuario() {
  return gql`
    mutation addUsuario(
      $cedula: Int!
      $direccion: String!
      $mail: String!
      $nombre: String!
      $rol: String!
      $telefono: String!
    ) {
      insert_data_usuario_one(
        object: {
          cedula: $cedula
          direccion: $direccion
          mail: $mail
          nombre: $nombre
          rol: $rol
          telefono: $telefono
        }
      ) {
        id
      }
    }
  `;
}

export function editUsuario() {
  return gql`
    mutation editUsuario(
      $cedula: Int!
      $direccion: String!
      $mail: String!
      $nombre: String!
      $rol: String!
      $telefono: String!
      $id: String!
    ) {
      update_data_usuario_by_pk(
        pk_columns: { id: $id }
        _set: {
          cedula: $cedula
          direccion: $direccion
          mail: $mail
          nombre: $nombre
          rol: $rol
          telefono: $telefono
        }
      ) {
        id
      }
    }
  `;
}

export function editRolUsuario() {
  return gql`
    mutation editRolUsuario($id: String!, $rol: String!) {
      update_data_usuario_by_pk(pk_columns: { id: $id }, _set: { rol: $rol }) {
        id
      }
    }
  `;
}

export function deleteUsuario(mail) {
  return gql`
mutation deleteUsuario {
  delete_data_usuario(where: {mail: {_eq: ${mail}}}) {
    returning{

    }
  }
}`;
}

//---------------------------------------------------Equipos-------------------------------------

export function getAllEquipoDetails() {
  return gql`
    query getAllEquipoDetails {
      data_servicio {
        nombre
      }
      data_ubicacion {
        nombre
        servicio
      }
      data_e_clasificacion_riesgo {
        nombre
      }
      data_e_estado_funcional {
        nombre
      }
      data_e_estado_fisico {
        nombre
      }
    }
  `;
}

export function getEquipos() {
  return gql`
    query getEquipos {
      data_equipo {
        id
        Observaciones
        clasificacion_riesgo
        estado_fisico
        estado_funcional
        garantia
        hoja_de_vida
        marca
        modelo
        n_activo_fijo
        n_serie
        nombre
        prioridad
        ubicacion
        servicio
      }
    }
  `;
}

export function addEquipo() {
  return gql`
    mutation addEquipo(
      $Observaciones: String!
      $clasificacion_riesgo: String!
      $estado_fisico: String!
      $estado_funcional: String!
      $garantia: date!
      $marca: String!
      $modelo: String!
      $n_activo_fijo: String!
      $n_serie: String!
      $nombre: String!
      $prioridad: Int!
      $servicio: String!
      $ubicacion: String!
    ) {
      insert_data_equipo_one(
        object: {
          Observaciones: $Observaciones
          clasificacion_riesgo: $clasificacion_riesgo
          estado_fisico: $estado_fisico
          estado_funcional: $estado_funcional
          garantia: $garantia
          marca: $marca
          modelo: $modelo
          n_activo_fijo: $n_activo_fijo
          n_serie: $n_serie
          nombre: $nombre
          prioridad: $prioridad
          servicio: $servicio
          ubicacion: $ubicacion
          hojaDeVidaByHojaDeVida: {
            data: {
              docTecnicaByDocTecnica: { data: {} }
              fuenteAlimentacionByFuenteAlimentacion: { data: {} }
              tipoAlimentacionByTipoAlimentacion: { data: {} }
            }
          }
        }
      ) {
        id
      }
    }
  `;
}

export function editEquipo() {
  return gql`
    mutation editEquipo(
      $id: Int!
      $Observaciones: String!
      $clasificacion_riesgo: String!
      $estado_fisico: String!
      $estado_funcional: String!
      $garantia: date!
      $hoja_de_vida: Int!
      $n_activo_fijo: String!
      $modelo: String!
      $marca: String!
      $n_serie: String!
      $nombre: String!
      $prioridad: Int!
      $servicio: String!
      $ubicacion: String!
    ) {
      update_data_equipo_by_pk(
        pk_columns: { id: $id }
        _set: {
          Observaciones: $Observaciones
          clasificacion_riesgo: $clasificacion_riesgo
          estado_fisico: $estado_fisico
          estado_funcional: $estado_funcional
          garantia: $garantia
          hoja_de_vida: $hoja_de_vida
          marca: $marca
          modelo: $modelo
          n_activo_fijo: $n_activo_fijo
          n_serie: $n_serie
          nombre: $nombre
          prioridad: $prioridad
          servicio: $servicio
          ubicacion: $ubicacion
        }
      ) {
        id
      }
    }
  `;
}

//-------------------------------------------------Servicio------------------------------------------------------

export function getServicio() {
  return gql`
    query getServicio {
      data_servicio {
        nombre
        prioridad
      }
    }
  `;
}

//----------------------------------------------Ubicacion---------------------------------------------------------

export function getUbicacion() {
  return gql`
    query getUbicacion {
      data_ubicacion {
        nombre
        servicio
      }
    }
  `;
}

//----------------------------------------------Clasificacion de riesgo---------------------------------------------------------

export function getClasif_riesgo() {
  return gql`
    query getClasif_riesgo {
      data_e_clasificacion_riesgo {
        nombre
      }
    }
  `;
}

//-----------------------------------------------Estado funcional--------------------------------------------------------

export function getEstadoFuncional() {
  return gql`
    query getEstadoFuncional {
      data_e_estado_funcional {
        nombre
      }
    }
  `;
}

//-------------------------------------------------Estado fisico------------------------------------------------------

export function getEstadoFisico() {
  return gql`
    query getEstadoFisico {
      data_e_estado_fisico {
        nombre
      }
    }
  `;
}

//-------------------------------------------------Tickets----------------------------------------------------

export function getTickets() {
  return gql`
    query getTicket {
      data_ticket {
        descripcion
        equipoByEquipo {
          prioridad
          servicio
          ubicacion
          nombre
          ubicacionByUbicacionServicio {
            servicioByServicio {
              prioridad
            }
          }
          nombre
          hoja_de_vida
        }
        usuarioByUsuario {
          nombre
        }
        tipo
        id
        fecha
        equipo
      }
    }
  `;
}

export function getDDTickets() {
  return gql`
    query getDDTickets {
      data_equipo {
        id
        nombre
        servicio
        ubicacion
      }
      data_e_tipo_ticket {
        nombre
      }
      data_servicio {
        nombre
      }
      data_ubicacion {
        nombre
        servicio
      }
    }
  `;
}

export function addTicket() {
  return gql`
    mutation addTicket(
      $descripcion: String!
      $equipo: Int!
      $fecha: date!
      $tipo: String!
      $usuario: String!
    ) {
      insert_data_ticket_one(
        object: {
          descripcion: $descripcion
          equipo: $equipo
          fecha: $fecha
          tipo: $tipo
          usuario: $usuario
        }
      ) {
        id
      }
    }
  `;
}

export function editTicket() {
  return gql`
    mutation editTicket(
      $id: Int!
      $descripcion: String!
      $equipo: Int!
      $fecha: date!
      $tipo: String!
      $usuario: String!
    ) {
      update_data_ticket_by_pk(
        pk_columns: { id: $id }
        _set: {
          descripcion: $descripcion
          equipo: $equipo
          fecha: $fecha
          tipo: $tipo
          usuario: $usuario
        }
      ) {
        id
      }
    }
  `;
}

export function deleteTicket(id) {
  return gql`
mutation deleteTicket {
delete_data_ticket_by_pk(id: ${id}) {
  id
}
}
`;
}

//--------------------------------------------------Tipo ticket---------------------------------------------------

export function getTipoTicket() {
  return gql`
    query getTipoTicket {
      data_e_tipo_ticket {
        nombre
      }
    }
  `;
}

//------------------------------------------------Mantenimiento----------------------------------------------------

export function getMantenimientos() {
  return gql`
    query getMantenimientos {
      data_mantenimiento {
        costo
        equipo
        estado
        fecha_egreso
        fecha_ingreso
        hoja_de_vida
        piezas
        procedimiento
        resultado
        ticket
        tiempo_empleado
        usuario
        visto
        id
        usuarioByUsuario {
          nombre
        }
        equipoByEquipo {
          prioridad
          nombre
          n_serie
          ubicacionByUbicacionServicio {
            servicioByServicio {
              prioridad
            }
          }
          n_serie
        }
        ticketByTicket {
          equipoByEquipo {
            nombre
            ubicacionByUbicacionServicio {
              servicioByServicio {
                prioridad
              }
            }
          }
        }
      }
    }
  `;
}

export function addMantenimiento() {
  return gql`
    mutation addMantenimiento(
      $ticket: Int!
      $usuario: String!
      $equipo: Int!
      $hoja_de_vida: Int!
    ) {
      insert_data_mantenimiento_one(
        object: {
          ticket: $ticket
          usuario: $usuario
          equipo: $equipo
          hoja_de_vida: $hoja_de_vida
        }
      ) {
        id
      }
    }
  `;
}

export function editMantenimiento() {
  return gql`
    mutation editMantenimiento(
      $id: Int!
      $costo: float8!
      $equipo: Int!
      $estado: String!
      $fecha_egreso: date!
      $piezas: String!
      $procedimiento: String!
      $resultado: String!
      $tiempo_empleado: String!
    ) {
      update_data_mantenimiento_by_pk(
        pk_columns: { id: $id }
        _set: {
          costo: $costo
          equipo: $equipo
          estado: $estado
          fecha_egreso: $fecha_egreso
          piezas: $piezas
          procedimiento: $procedimiento
          resultado: $resultado
          tiempo_empleado: $tiempo_empleado
        }
      ) {
        id
      }
    }
  `;
}

//-------------------------------------------------Estado mantenimiento-----------------------------------------------

export function getEstadosMantenimiento() {
  return gql`
    query getEstadosMantenimiento {
      data_equipo {
        id
        nombre
        n_serie
      }
      data_e_estado {
        nombre
      }
    }
  `;
}

//--------------------------------------------------Hoja de vida---------------------------------------------------

export function getHojaDeVida(id) {
  return gql`
    query getHojaDeVida {
      data_hoja_de_vida_by_pk(id: ${id}) {
        accesorios_componentes(where: { hoja_de_vida: { _eq: ${id} } }) {
          id
          marca
          nombre
          serie_referencia
        }
        autorizacion_msp
        ciudad_distribuidor
        ciudad_fabricante
        clasif_biomedica
        clasif_inter_proteccion
        clasif_riesgo_clinico
        clasif_riesgo_electrico
        clasif_riesgo_sanitario
        distribuidor
        doc_tecnica
        docTecnicaByDocTecnica {
          diagrama_partes
          manual_operacion
          manual_servicio
          otros
          planos
        }
        fabricante
        fecha_adquisicion
        fecha_instalacion
        forma_adquisicion
        fuente_alimentacion
        fuenteAlimentacionByFuenteAlimentacion {
          corriente
          frecuencia
          potencia
          presion
          temperatura
          voltaje
        }
        guia_limpieza
        id
        mantenimientos {
          id
          costo
          equipo
          estado
          fecha_egreso
          fecha_ingreso
          piezas
          procedimiento
          resultado
          ticket
          tiempo_empleado
          usuarioByUsuario {
            nombre
          }
          visto
          equipoByEquipo {
            nombre
            n_serie
          }
        }
        periodo {
          nombre
          valor_numerico
        }
        periodoByPeriodMantenimiento {
          nombre
          valor_numerico
        }
        period_calibracion
        period_mantenimiento
        recom_fabricante
        rut
        tecnologia_predominante
        telefono
        tipo_alimentacion
        tipoAlimentacionByTipoAlimentacion {
          agua
          aire
          bateria
          electricidad
          emergencia
          estandar
          oxigeno
          regulada
          servicio
          vacio
          vapor
        }
      }
    }
  `;
}

export function editHojaDeVida() {
  return gql`
    mutation editHojaDeVida(
      $id: Int!
      $corriente: String!
      $frecuencia: String!
      $potencia: String!
      $presion: String!
      $temperatura: String!
      $voltaje: String!
      $agua: Boolean!
      $aire: Boolean!
      $bateria: Boolean!
      $electricidad: Boolean!
      $emergencia: Boolean!
      $estandar: Boolean!
      $oxigeno: Boolean!
      $regulada: Boolean!
      $servicio: Boolean!
      $vacio: Boolean!
      $vapor: Boolean!
      $diagrama_partes: String!
      $manual_operacion: String!
      $manual_servicio: String!
      $otrosDocumentacion: String!
      $planos: String!
      $autorizacion_msp: String!
      $ciudad_distribuidor: String!
      $ciudad_fabricante: String!
      $clasif_biomedica: String!
      $clasif_inter_proteccion: String!
      $clasif_riesgo_clinico: String!
      $clasif_riesgo_electrico: String!
      $clasif_riesgo_sanitario: String!
      $distribuidor: String!
      $doc_tecnica: Int!
      $fabricante: String!
      $fecha_adquisicion: String!
      $fecha_instalacion: String!
      $forma_adquisicion: String!
      $fuente_alimentacion: Int!
      $guia_limpieza: String!
      $period_calibracion: String!
      $period_mantenimiento: String!
      $recom_fabricante: String!
      $rut: String!
      $tecnologia_predominante: String!
      $telefono: String!
      $tipo_alimentacion: Int!
    ) {
      update_data_fuente_alimentacion_by_pk(
        pk_columns: { id: $fuente_alimentacion }
        _set: {
          corriente: $corriente
          frecuencia: $frecuencia
          potencia: $potencia
          presion: $presion
          temperatura: $temperatura
          voltaje: $voltaje
        }
      ) {
        id
      }
      update_data_tipo_alimentacion_by_pk(
        pk_columns: { id: $tipo_alimentacion }
        _set: {
          agua: $agua
          aire: $aire
          bateria: $bateria
          electricidad: $electricidad
          emergencia: $emergencia
          estandar: $estandar
          oxigeno: $oxigeno
          regulada: $regulada
          servicio: $servicio
          vacio: $vacio
          vapor: $vapor
        }
      ) {
        id
      }
      update_data_doc_tecnica_by_pk(
        pk_columns: { id: $doc_tecnica }
        _set: {
          diagrama_partes: $diagrama_partes
          manual_operacion: $manual_operacion
          manual_servicio: $manual_servicio
          otros: $otrosDocumentacion
          planos: $planos
        }
      ) {
        id
      }
      update_data_hoja_de_vida_by_pk(
        pk_columns: { id: $id }
        _set: {
          autorizacion_msp: $autorizacion_msp
          ciudad_distribuidor: $ciudad_distribuidor
          ciudad_fabricante: $ciudad_fabricante
          clasif_biomedica: $clasif_biomedica
          clasif_inter_proteccion: $clasif_inter_proteccion
          clasif_riesgo_clinico: $clasif_riesgo_clinico
          clasif_riesgo_electrico: $clasif_riesgo_electrico
          clasif_riesgo_sanitario: $clasif_riesgo_sanitario
          distribuidor: $distribuidor
          doc_tecnica: $doc_tecnica
          fabricante: $fabricante
          fecha_adquisicion: $fecha_adquisicion
          fecha_instalacion: $fecha_instalacion
          forma_adquisicion: $forma_adquisicion
          fuente_alimentacion: $fuente_alimentacion
          guia_limpieza: $guia_limpieza
          period_calibracion: $period_calibracion
          period_mantenimiento: $period_mantenimiento
          recom_fabricante: $recom_fabricante
          rut: $rut
          tecnologia_predominante: $tecnologia_predominante
          telefono: $telefono
          tipo_alimentacion: $tipo_alimentacion
        }
      ) {
        id
      }
    }
  `;
}

//-------------------------------------Componentes-------------------------------------

export function getComponentes() {
  return gql`
    query getComponente {
      data_accesorios_componentes {
        serie_referencia
        nombre
        marca
        id
      }
    }
  `;
}

export function addComponente() {
  return gql`
    mutation addComponente(
      $serie_referencia: String!
      $nombre: String!
      $marca: String!
      $hoja_de_vida: Int!
    ) {
      insert_data_accesorios_componentes_one(
        object: {
          hoja_de_vida: $hoja_de_vida
          marca: $marca
          nombre: $nombre
          serie_referencia: $serie_referencia
        }
      ) {
        id
      }
    }
  `;
}

export function editComponente() {
  return gql`
    mutation editComponente(
      $id: Int!
      $hoja_de_vida: Int!
      $marca: String!
      $nombre: String!
      $serie_referencia: String!
    ) {
      update_data_accesorios_componentes_by_pk(
        pk_columns: { id: $id }
        _set: {
          hoja_de_vida: $hoja_de_vida
          marca: $marca
          nombre: $nombre
          serie_referencia: $serie_referencia
        }
      ) {
        id
      }
    }
  `;
}

//----------------------------------Documentacion tecnica-------------------------------------------------

export function getDocumentacion() {
  return gql`
query getDocumentacion {
  data_doc_tecnica {
    diagrama_partes
    id
    manual_operacion
    manual_servicio
    planos
  }`;
}
//---------------------------------------------------Fuente alimentacion-------------------------------------------

export function getFuenteAlimentacion() {
  return gql`
    query getFuenteAlimentacion {
      data_fuente_alimentacion {
        corriente
        frecuencia
        id
        potencia
        presion
        temperatura
        voltaje
      }
    }
  `;
}

//------------------------------------------------Periodos----------------------------------------------

export function getPeriodos() {
  return gql`
    query getPeriodo {
      data_periodos {
        nombre
        valor_numerico
      }
    }
  `;
}

//----------------------------------------------Tipo de alimentacion--------------------------------------

export function getTipoAlimentacion() {
  return gql`
    query getTipoAlimentacion {
      data_tipo_alimentacion {
        agua
        aire
        bateria
        electricidad
        emergencia
        estandar
        oxigeno
        regulada
        servicio
        vacio
        vapor
      }
    }
  `;
}
