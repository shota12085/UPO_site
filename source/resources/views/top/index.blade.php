@extends('../layout')
@section('content')
<?php
  require '../vendor/autoload.php';
  use Carbon\Carbon;

  $m = isset($_GET['m'])? htmlspecialchars($_GET['m'], ENT_QUOTES, 'utf-8') : '';
  $y = isset($_GET['y'])? htmlspecialchars($_GET['y'], ENT_QUOTES, 'utf-8') : '';
  if($m!=''||$y!=''){
      $dt = Carbon::createFromDate($y,$m,01);
  }else{
      $dt = Carbon::createFromDate();
  }

  function renderCalendar($dt)
  { 
      $dt->startOfMonth();
      $dt->timezone = 'Asia/Tokyo';
      
      //１ヶ月前
      $sub = Carbon::createFromDate($dt->year,$dt->month,$dt->day);
      $subMonth = $sub->subMonth();
      $subY = $subMonth->year;
      $subM = $subMonth->month;
         
      //1ヶ月後
      $add = Carbon::createFromDate($dt->year,$dt->month,$dt->day);
      $addMonth = $add->addMonth();
      $addY = $addMonth->year;
      $addM = $addMonth->month;

      //リンク
      //今月
      $today = Carbon::createFromDate();
      $todayY = $today->year;
      $todayM = $today->month;
      
      //リンク

      $title = '<div class="month"><div class="month-link"><a class="left left-space" href="/?y='.$todayY.'&&m='.$todayM.'">今日 </a>';
      $title .= '<a class="left" href="/?y='.$subY.'&&m='.$subM.'"><<前月 </a>';//前月のリンク
      $title .= '<a class="right" href="/?y='.$addY.'&&m='.$addM.'"> 来月>></a></div><h4>'.$dt->format('F Y').'</h4></div>';//来月リンク
      
      $headings = ['月','火','水','木','金','土','日'];
      // $headings = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saterday','Sunday'];
    
      $calendar = '<table class="calendar-table">';
      $calendar .= '<thead >';
      foreach($headings as $heading){
          $calendar .= '<th class="header">'.$heading.'</th>';
      }
      $calendar .= '</thead>';
          $calendar .= '<tbody><tr>';

      //今月は何日まであるか
      $daysInMonth = $dt->daysInMonth;
      
      for ($i = 1; $i <= $daysInMonth; $i++) {
        if($i==1){
          if ($dt->format('N')!= 1) {
            $calendar .= '<td colspan="'.($dt->format('N')-1).'"></td>';
          }
        }

        if($dt->format('N') == 1){
          $calendar .= '</tr><tr>';
        }
        
        $comp = new Carbon($dt->year."-".$dt->month."-".$dt->day); //ループで表示している日
        $comp_now = Carbon::today(); //今日

        //ループの日と今日を比較
        if ($comp->eq($comp_now)) {
            //同じなので緑色の背景にする
            $calendar .= '<td class="day" style="background-color:#008b8b;">'.$dt->day.'</td>';
        }else{
          switch ($dt->format('N')) {
            case 6:
                $calendar .= '<td class="day" style="background-color:#b0e0e6">'.$dt->day.'</td>';
                break;
            case 7:
                $calendar .= '<td class="day" style="background-color:#f08080">'.$dt->day.'</td>';
                break;
            default:
                $calendar .= '<td class="day" >'.$dt->day.'</td>';
                break;
          }
        }
        $dt->addDay();
      }

      $calendar .= '</tr></tbody>';
      $calendar .= '</table>';
    
      // echo $title.$calendar;
      return $title.$calendar;
  }
?>

<div class="main">
  <div class="first">
    <div class="image">
      <img class="image-size" src="https://upv.jp/wp/wp-content/uploads/2018/03/sora_main.jpg" alt="写真">
    </div>  
    <div class="calendar">
      <h4>空室カレンダー</h3>
      <?php echo renderCalendar($dt); ?>
    </div>

  </div>
  <div class="second container-fluid">
    <div class="row">
      <div class="col-sm-4">
        <h5>レストラン（喫茶）</h5>
        <p>営業時間</p>
        <p>10:00 ~ 15:00</p>
        <p>定休日  水曜日</p>
      </div>
      <div class="col-sm-4">
        <h5>メニュー</h5>
      </div>
      <div class="col-sm-4">
        <h5>お知らせ</h5>
        <div class="news-list">
          
          <div id="news"></div>
        </div>
      </div>
    </div>
  </div>
  <script src="{{ asset('js/app.js')}}"></script>
</div>
@endsection
