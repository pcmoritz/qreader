<template>
  <div class="feed-list">
      <el-row :gutter="14">
        <el-col v-for="(feed, index) in items" :key="index" :sm="12" :md="12" :lg="8">
          <div class="feed-item" :class="{ 'query-match': query == feed.title }" @mouseover="markIt(feed)" :style="{ 'background-color': float2color(feed.like) }">
              <div class="feed-thumb" v-if="feed.img">
                  <img :src="feed.img" alt="">
              </div>
              <i class="favebtn" @click.prevent="faveIt(feed)" :class="{'el-icon-star-on': isFaved(feed.link), 'el-icon-star-off': !isFaved(feed.link) }"></i>
              <h3> <a target="_blank" :title="feed.title" :href="feed.link">{{ feed.title }}</a></h3>
              <p class="feed-meta">
                 <span v-if="feed.pubDate"> Posted <i class="el-icon-date"></i> <span class="text-dark">{{ new Date(feed.pubDate).toDateString() }}</span></span>
                  <span v-if="feed.favedAt && fav"> <i class="el-icon-star-on"></i> Faved <span class="text-dark">{{ faveTime(feed.favedAt) }} </span></span>
              </p>
              <div class="feed-desc">
                  <p>{{ feed.description_text }}</p>
              </div>
          </div>
        </el-col>
        <!-- end feed item -->
      </el-row>
      <!-- end feed row -->
  </div>
  <!-- end feed list -->
</template>

<script>
  import { axios } from '../utils'
  import { common } from '../utils';

  export default {
    props: {
      items: { default: [] },
      fav: false,
      query: ''
    },
    methods: {
      isFaved(link) {
        return this.$store.getters.isFaved(link);
      },
      faveIt(item) {
          item.favedAt = new Date();
          this.$store.commit('TOGGLE_FAV', item);
      },
      faveTime(time) {
          return common.timeAgo(time);
      },
      markIt(item) {
          if(!this.isFaved(item.link)) {
            this.faveIt(item);
            axios.post('api', {"method": "mark_channel", "args": [item.link]})
          }
      },
      float2color(percentage) {
        var color_part_dec = 255 * percentage;
        var color_part_hex = Number(parseInt(color_part_dec, 10)).toString(16);
        return "#" + color_part_hex + color_part_hex + color_part_hex;
      }
    }
  }
</script>
