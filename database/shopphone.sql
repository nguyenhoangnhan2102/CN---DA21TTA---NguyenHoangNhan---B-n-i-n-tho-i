/*==============================================================*/
/* DBMS name:      SAP SQL Anywhere 17                          */
/* Created on:     11/22/2024 2:35:05 PM                        */
/*==============================================================*/


if exists(select 1 from sys.sysforeignkey where role='FK_CHITIETD_CO_CHI_TI_DONHANG') then
    alter table CHITIETDONHANG
       delete foreign key FK_CHITIETD_CO_CHI_TI_DONHANG
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_CHITIETD_CO_SAN_PH_SANPHAM') then
    alter table CHITIETDONHANG
       delete foreign key FK_CHITIETD_CO_SAN_PH_SANPHAM
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_DONHANG_CO__ON_HA_KHACHHAN') then
    alter table DONHANG
       delete foreign key FK_DONHANG_CO__ON_HA_KHACHHAN
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_GIOHANG_CO_SANPHAM') then
    alter table GIOHANG
       delete foreign key FK_GIOHANG_CO_SANPHAM
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_GIOHANG_CO_GIO_HA_KHACHHAN') then
    alter table GIOHANG
       delete foreign key FK_GIOHANG_CO_GIO_HA_KHACHHAN
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_HINHANHS_CO_HINH_A_SANPHAM') then
    alter table HINHANHSANPHAM
       delete foreign key FK_HINHANHS_CO_HINH_A_SANPHAM
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_MAUSACSA_CO_MAU_SA_SANPHAM') then
    alter table MAUSACSANPHAM
       delete foreign key FK_MAUSACSA_CO_MAU_SA_SANPHAM
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_SANPHAM_ASSOCIATI_THUONGHI') then
    alter table SANPHAM
       delete foreign key FK_SANPHAM_ASSOCIATI_THUONGHI
end if;

drop index if exists CHITIETDONHANG.CO_SAN_PHAM_FK;

drop index if exists CHITIETDONHANG.CO_CHI_TIET_FK;

drop index if exists CHITIETDONHANG.CHITIETDONHANG_PK;

drop table if exists CHITIETDONHANG;

drop index if exists DONHANG.CO__ON_HANG_FK;

drop index if exists DONHANG.DONHANG_PK;

drop table if exists DONHANG;

drop index if exists GIOHANG.CO_FK;

drop index if exists GIOHANG.CO_GIO_HANG_FK;

drop index if exists GIOHANG.GIOHANG_PK;

drop table if exists GIOHANG;

drop index if exists HINHANHSANPHAM.CO_HINH_ANH_FK;

drop index if exists HINHANHSANPHAM.HINHANHSANPHAM_PK;

drop table if exists HINHANHSANPHAM;

drop index if exists KHACHHANG.KHACHHANG_PK;

drop table if exists KHACHHANG;

drop index if exists MAUSACSANPHAM.CO_MAU_SAC_FK;

drop index if exists MAUSACSANPHAM.MAUSACSANPHAM_PK;

drop table if exists MAUSACSANPHAM;

drop index if exists SANPHAM.ASSOCIATION_5_FK;

drop index if exists SANPHAM.SANPHAM_PK;

drop table if exists SANPHAM;

drop index if exists THUONGHIEU.THUONGHIEU_PK;

drop table if exists THUONGHIEU;

/*==============================================================*/
/* Table: CHITIETDONHANG                                        */
/*==============================================================*/
create or replace table CHITIETDONHANG 
(
   MACHITIETDONHANG     integer                        not null,
   MADONHANG            integer                        not null,
   MASANPHAM            integer                        not null,
   GIATIEN              integer                        null,
   SOLUONG              integer                        null,
   constraint PK_CHITIETDONHANG primary key clustered (MACHITIETDONHANG)
);

/*==============================================================*/
/* Index: CHITIETDONHANG_PK                                     */
/*==============================================================*/
create unique clustered index CHITIETDONHANG_PK on CHITIETDONHANG (
MACHITIETDONHANG ASC
);

/*==============================================================*/
/* Index: CO_CHI_TIET_FK                                        */
/*==============================================================*/
create index CO_CHI_TIET_FK on CHITIETDONHANG (
MADONHANG ASC
);

/*==============================================================*/
/* Index: CO_SAN_PHAM_FK                                        */
/*==============================================================*/
create index CO_SAN_PHAM_FK on CHITIETDONHANG (
MASANPHAM ASC
);

/*==============================================================*/
/* Table: DONHANG                                               */
/*==============================================================*/
create or replace table DONHANG 
(
   MADONHANG            integer                        not null,
   ID                   integer                        not null,
   NGAYLAP              timestamp                      null,
   TRANGTHAIDONHANG     varchar(255)                   null,
   HOTENKHACHHANG       varchar(255)                   null,
   SDTKHACHANG          integer                        null,
   DIACHIGIAOHANG       long varchar                   null,
   TONGTIEN             integer                        null,
   constraint PK_DONHANG primary key clustered (MADONHANG)
);

/*==============================================================*/
/* Index: DONHANG_PK                                            */
/*==============================================================*/
create unique clustered index DONHANG_PK on DONHANG (
MADONHANG ASC
);

/*==============================================================*/
/* Index: CO__ON_HANG_FK                                        */
/*==============================================================*/
create index CO__ON_HANG_FK on DONHANG (
ID ASC
);

/*==============================================================*/
/* Table: GIOHANG                                               */
/*==============================================================*/
create or replace table GIOHANG 
(
   MAGIOHANG            integer                        not null,
   MASANPHAM            integer                        not null,
   ID                   integer                        not null,
   SOLUONG              integer                        null,
   constraint PK_GIOHANG primary key clustered (MAGIOHANG)
);

/*==============================================================*/
/* Index: GIOHANG_PK                                            */
/*==============================================================*/
create unique clustered index GIOHANG_PK on GIOHANG (
MAGIOHANG ASC
);

/*==============================================================*/
/* Index: CO_GIO_HANG_FK                                        */
/*==============================================================*/
create index CO_GIO_HANG_FK on GIOHANG (
ID ASC
);

/*==============================================================*/
/* Index: CO_FK                                                 */
/*==============================================================*/
create index CO_FK on GIOHANG (
MASANPHAM ASC
);

/*==============================================================*/
/* Table: HINHANHSANPHAM                                        */
/*==============================================================*/
create or replace table HINHANHSANPHAM 
(
   MAHINHANH            integer                        not null,
   MASANPHAM            integer                        not null,
   TENHINHANH           long varchar                   null,
   constraint PK_HINHANHSANPHAM primary key clustered (MAHINHANH)
);

/*==============================================================*/
/* Index: HINHANHSANPHAM_PK                                     */
/*==============================================================*/
create unique clustered index HINHANHSANPHAM_PK on HINHANHSANPHAM (
MAHINHANH ASC
);

/*==============================================================*/
/* Index: CO_HINH_ANH_FK                                        */
/*==============================================================*/
create index CO_HINH_ANH_FK on HINHANHSANPHAM (
MASANPHAM ASC
);

/*==============================================================*/
/* Table: KHACHHANG                                             */
/*==============================================================*/
create or replace table KHACHHANG 
(
   ID                   integer                        not null,
   HOTEN                varchar(255)                   null,
   EMAIL                varchar(255)                   null,
   PASSWORD             varchar(255)                   null,
   ROLE                 integer                        null,
   SODIENTHOAI          integer                        null,
   DIACHI               long varchar                   null,
   constraint PK_KHACHHANG primary key clustered (ID)
);

/*==============================================================*/
/* Index: KHACHHANG_PK                                          */
/*==============================================================*/
create unique clustered index KHACHHANG_PK on KHACHHANG (
ID ASC
);

/*==============================================================*/
/* Table: MAUSACSANPHAM                                         */
/*==============================================================*/
create or replace table MAUSACSANPHAM 
(
   MAMAU                integer                        not null,
   MASANPHAM            integer                        not null,
   TENMAUSANPHAM        long varchar                   null,
   constraint PK_MAUSACSANPHAM primary key clustered (MAMAU)
);

/*==============================================================*/
/* Index: MAUSACSANPHAM_PK                                      */
/*==============================================================*/
create unique clustered index MAUSACSANPHAM_PK on MAUSACSANPHAM (
MAMAU ASC
);

/*==============================================================*/
/* Index: CO_MAU_SAC_FK                                         */
/*==============================================================*/
create index CO_MAU_SAC_FK on MAUSACSANPHAM (
MASANPHAM ASC
);

/*==============================================================*/
/* Table: SANPHAM                                               */
/*==============================================================*/
create or replace table SANPHAM 
(
   MASANPHAM            integer                        not null,
   MATHUONGHIEU         integer                        not null,
   TENSANPHAM           varchar(255)                   null,
   GIASANPHAM           integer                        null,
   SOLUONGSANPHAM       integer                        null,
   HEDIEUHANH           varchar(255)                   null,
   CPU                  varchar(255)                   null,
   GPU                  varchar(255)                   null,
   RAM                  varchar(50)                    null,
   DUNGLUONG            varchar(50)                    null,
   CAMERATRUOC          varchar(255)                   null,
   CAMERASAU            varchar(255)                   null,
   CONGNGHEMANHINH      varchar(255)                   null,
   DOPHANGIAIMANHINH    varchar(255)                   null,
   PIN                  varchar(255)                   null,
   MOTASANPHAM          long varchar                   null,
   HINHANHCHINH         long varchar                   null,
   constraint PK_SANPHAM primary key clustered (MASANPHAM)
);

/*==============================================================*/
/* Index: SANPHAM_PK                                            */
/*==============================================================*/
create unique clustered index SANPHAM_PK on SANPHAM (
MASANPHAM ASC
);

/*==============================================================*/
/* Index: ASSOCIATION_5_FK                                      */
/*==============================================================*/
create index ASSOCIATION_5_FK on SANPHAM (
MATHUONGHIEU ASC
);

/*==============================================================*/
/* Table: THUONGHIEU                                            */
/*==============================================================*/
create or replace table THUONGHIEU 
(
   MATHUONGHIEU         integer                        not null,
   TENTHUONGHIEU        varchar(255)                   null,
   constraint PK_THUONGHIEU primary key clustered (MATHUONGHIEU)
);

/*==============================================================*/
/* Index: THUONGHIEU_PK                                         */
/*==============================================================*/
create unique clustered index THUONGHIEU_PK on THUONGHIEU (
MATHUONGHIEU ASC
);

alter table CHITIETDONHANG
   add constraint FK_CHITIETD_CO_CHI_TI_DONHANG foreign key (MADONHANG)
      references DONHANG (MADONHANG)
      on update restrict
      on delete restrict;

alter table CHITIETDONHANG
   add constraint FK_CHITIETD_CO_SAN_PH_SANPHAM foreign key (MASANPHAM)
      references SANPHAM (MASANPHAM)
      on update restrict
      on delete restrict;

alter table DONHANG
   add constraint FK_DONHANG_CO__ON_HA_KHACHHAN foreign key (ID)
      references KHACHHANG (ID)
      on update restrict
      on delete restrict;

alter table GIOHANG
   add constraint FK_GIOHANG_CO_SANPHAM foreign key (MASANPHAM)
      references SANPHAM (MASANPHAM)
      on update restrict
      on delete restrict;

alter table GIOHANG
   add constraint FK_GIOHANG_CO_GIO_HA_KHACHHAN foreign key (ID)
      references KHACHHANG (ID)
      on update restrict
      on delete restrict;

alter table HINHANHSANPHAM
   add constraint FK_HINHANHS_CO_HINH_A_SANPHAM foreign key (MASANPHAM)
      references SANPHAM (MASANPHAM)
      on update restrict
      on delete restrict;

alter table MAUSACSANPHAM
   add constraint FK_MAUSACSA_CO_MAU_SA_SANPHAM foreign key (MASANPHAM)
      references SANPHAM (MASANPHAM)
      on update restrict
      on delete restrict;

alter table SANPHAM
   add constraint FK_SANPHAM_ASSOCIATI_THUONGHI foreign key (MATHUONGHIEU)
      references THUONGHIEU (MATHUONGHIEU)
      on update restrict
      on delete restrict;

