<?php
class AccesoDatos
{
    private static $_objetoAccesoDatos;
    private $_objetoPDO;
    private $_dbName;
 
    private function __construct($_dbName)
    {
        $this->_dbName = $_dbName;
        try {
            $this->_objetoPDO = new PDO('mysql:host=localhost;dbname='.$this->_dbName'.;charset=utf8', 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
 
            $this->_objetoPDO->exec("SET CHARACTER SET utf8");
 
        } catch (PDOException $e) {
 
            print "Error!!!<br/>" . $e->getMessage();
 
            die();
        }
    }
 
    public function RetornarConsulta($sql)
    {
        return $this->_objetoPDO->prepare($sql);
    }
 
    public static function DameUnObjetoAcceso($_dbName)//singleton
    {
        if (!isset(self::$_objetoAccesoDatos)) {       
            self::$_objetoAccesoDatos = new AccesoDatos($_dbName); 
        }
 
        return self::$_objetoAccesoDatos;        
    }
 
    // Evita que el objeto se pueda clonar
    public function __clone()
    {
        trigger_error('La clonaci&oacute;n de este objeto no est&aacute; permitida!!!', E_USER_ERROR);
    }
}
?>